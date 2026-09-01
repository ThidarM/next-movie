"use client";

import { GenreType } from "@/types/global";
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(pathname: string, genre?: GenreType) {
	if (!genre) return pathname === "/";
	const parts = pathname.split("/");
	return parts[1] === "genre" && parts[3] === String(genre.id);
}

export function GenreLinks({
	genres,
	variant = "sidebar",
	onNavigate,
}: {
	genres: GenreType[];
	variant?: "sidebar" | "chips";
	onNavigate?: () => void;
}) {
	const pathname = usePathname();

	if (variant === "chips") {
		return (
			<nav
				aria-label="Genres"
				className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
				<Chip
					href="/"
					active={isActive(pathname)}
					onClick={onNavigate}>
					All
				</Chip>
				{genres.map(genre => (
					<Chip
						key={genre.id}
						href={`/genre/${genre.name}/${genre.id}`}
						active={isActive(pathname, genre)}
						onClick={onNavigate}>
						{genre.name}
					</Chip>
				))}
			</nav>
		);
	}

	return (
		<nav
			aria-label="Genres"
			className="flex flex-col gap-0.5">
			<SidebarLink
				href="/"
				active={isActive(pathname)}
				onClick={onNavigate}>
				<Clapperboard className="size-4" />
				All genres
			</SidebarLink>
			{genres.map(genre => (
				<SidebarLink
					key={genre.id}
					href={`/genre/${genre.name}/${genre.id}`}
					active={isActive(pathname, genre)}
					onClick={onNavigate}>
					<span className="size-1.5 rounded-full bg-current opacity-50" />
					{genre.name}
				</SidebarLink>
			))}
		</nav>
	);
}

function Chip({
	href,
	active,
	children,
	onClick,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				"shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
				active
					? "border-primary/40 bg-primary text-primary-foreground"
					: "border-white/10 bg-white/4 text-muted-foreground hover:border-white/20 hover:text-foreground",
			)}>
			{children}
		</Link>
	);
}

function SidebarLink({
	href,
	active,
	children,
	onClick,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				"flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
				active
					? "bg-primary/15 font-medium text-primary"
					: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
			)}>
			{children}
		</Link>
	);
}