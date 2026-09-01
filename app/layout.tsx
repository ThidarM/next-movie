import type { Metadata } from "next";
import { Geist_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import { GenreType } from "@/types/global";
import Link from "next/link";
import SearchForm from "@/components/search-form";
import MobileNav from "@/components/mobile-nav";
import { GenreLinks } from "@/components/genre-nav";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-sans",
});

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-syne",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Next Movie",
		template: "%s · Next Movie",
	},
	description: "A cinematic guide to popular, upcoming, and genre films.",
};

async function fetchGenres(): Promise<GenreType[]> {
	const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
	return data.genres ?? [];
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
	const genres = await fetchGenres();

	return (
		<html
			lang="en"
			className={cn(
				"h-full antialiased",
				outfit.variable,
				syne.variable,
				geistMono.variable,
				"font-sans",
			)}>
			<body className="flex min-h-full flex-col bg-background" suppressHydrationWarning>
				<header className="sticky top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-xl">
					<div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
						<Link
							href="/"
							className="flex shrink-0 items-center gap-2 font-heading text-lg tracking-tight sm:text-xl">
							<span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
								<Clapperboard className="size-4" />
							</span>
							<span className="hidden sm:inline">Next Movie</span>
						</Link>

						<SearchForm
							id="search-desktop"
							className="mx-auto hidden w-full max-w-md sm:block"
						/>

						<div className="ml-auto flex items-center gap-2">
							<MobileNav genres={genres} />
						</div>
					</div>
					<div className="border-t border-white/6 px-4 py-2.5 sm:hidden">
						<SearchForm id="search-mobile" />
					</div>
				</header>

				<div className="mx-auto flex w-full max-w-7xl flex-1">
					<aside className="sticky top-[4.25rem] z-10 hidden h-[calc(100vh-4.25rem)] w-56 shrink-0 overflow-y-auto border-r border-white/8 px-4 py-6 lg:block">
						<p className="mb-3 px-3 text-[0.7rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
							Genres
						</p>
						<GenreLinks genres={genres} />
					</aside>

					<div className="min-w-0 flex-1">
						<div className="border-b border-white/6 py-3 lg:hidden">
							<GenreLinks
								genres={genres}
								variant="chips"
							/>
						</div>
						<main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
							{children}
						</main>
					</div>
				</div>

				<footer className="mt-auto border-t border-white/8">
					<div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
						<p>Next Movie · a TMDB-powered cinema guide</p>
						<p>This product uses the TMDB API but is not endorsed by TMDB.</p>
					</div>
				</footer>
			</body>
		</html>
	);
}