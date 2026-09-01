import Image from "next/image";
import Link from "next/link";
import { tmdbImage, yearFromDate } from "@/lib/tmdb";
import { MovieType } from "@/types/global";
import {cn} from "@/lib/utils";
import {Play,Star} from "lucide-react";
import { buttonVariants } from "./ui/button";

export default function HeroBanner({ movie }: { movie: MovieType }) {
	const backdrop = tmdbImage(movie.backdrop_path, "w1280");
	const year = yearFromDate(movie.release_date);
	const rating=
	      movie.vote_average && movie.vote_average>0
		  ? movie.vote_average.toFixed(1)
		  :null;

	return (
		<section className="relative isolate overflow-hidden rounded-3xl ring-1 ring-white/8">
			<div className="relative aspect-16/10 min-h-[320px] w-full sm:aspect-21/9 sm:min-h-[380px] lg:min-h-[460px]">
			
				{backdrop ? (
					<Image
						src={backdrop}
						alt={movie.title}
						fill
						priority
						sizes="100vw"
						className="object-cover"
					/>
				) : (
					<div className="absolute inset-0 bg-muted"/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-background/15" />
				<div className="grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
			</div>

			<div className="absolute inset-0 flex items-end">
				<div className="w-full max-w-3xl px-4 pb-6 sm:pb-10">
					<p className="mb-2 text-[0.7rem] font-semibold tracking-[0.24em] text-primary uppercase">
						Featured tonight
					</p>
					<h2 className="font-heading text-3xl leading-tight text-balance sm:text-5xl">
						{movie.title}
					</h2>
					<div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/75" >
						<span>{year}</span>
						{rating&&(
							<span className="inline-flex items-center gap-1 text-primary">
								<Star className="size-3.5 fill-current"/>
								{rating}
							</span>
						)}
					</div>
					<p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
					{movie.overview}
					</p>
					<Link
						href={`/detail/${movie.id}`}
						className={cn(
							buttonVariants({size:"lg"}),
							"mt-5 rounded-full px-5",
						)}>
							<Play className="fill-current"/>
							View details
					</Link>
				</div>
			</div>
		</section>
	);
}