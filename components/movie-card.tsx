import { MovieType} from "@/types/global";
import { tmdbImage,yearFromDate } from "@/lib/tmdb";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: MovieType }) {
	const poster = tmdbImage(movie.poster_path, "w342");
	const year = yearFromDate(movie.release_date);
	const rating =
		movie.vote_average && movie.vote_average > 0
			? movie.vote_average.toFixed(1)
			: null;

	return (
		<Link
			href={`/detail/${movie.id}`}
			className="group block">
			<div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-muted ring-1 ring-white/8 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-18px_oklch(0.82_0.155_78/0.45)] group-hover:ring-primary/40">
				{poster ? (
					<Image
						src={poster}
						alt={movie.title}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center px-3 text-center text-sm text-muted-foreground">
						No poster
					</div>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-90" />
				{rating && (
					<div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-xs font-medium text-primary backdrop-blur-sm">
						<Star className="size-3 fill-current" />
						{rating}
					</div>
				)}
				<div className="absolute inset-x-0 bottom-0 p-3">
					<h3 className="line-clamp-2 text-sm leading-snug font-semibold text-white sm:text-[0.95rem]">
						{movie.title}
					</h3>
					<p className="mt-0.5 text-xs text-white/65">{year}</p>
				</div>
			</div>
		</Link>
	);
}