import MovieTrailer from "@/components/movie-trailer";
import PageHeader from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { formatRuntime, pickTrailer, tmdbImage, yearFromDate } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import type { MovieType, PersonType, VideoType } from "@/types/global";
import { Clock, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

async function fetchMovie(id:string):Promise<MovieType>{
    const res=await fetch(`https://api.themoviedb.org/3/movie/${id}`,{
        headers:{
            Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
        },
    });
    return res.json();

}

async function fetchCard(id:string):Promise<PersonType>{
    const res=await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
        headers:
            {
                Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    );

    const data=await res.json();
    return data.cast??[];
}

async function fetchVideo(id:string):Promise<VideoType>{
    const res=await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
        headers:
            {
                Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    );

    const data=await res.json();
    return data.results??[];
}

export async function generateMetadata({params

}:{
    params:Promise<{id:string}>;
}):Promise<Metadata> {
    const {id}=await params;
    const movie=await fetchMovie(id);
    return {title:movie.title}
};

export default async function MovieDetail({
    params
}:{
    params:Promise<{id:string}>;
}) {
    const {id}=await params;
    const[movie,cast,videos]=await Promise.all([
        fetchMovie(id),
        fetchCard(id),
        fetchVideo(id),
    ]);
    const trailer=pickTrailer(videos);
    const year=yearFromDate(movie.release_date);
    const runtime=formatRuntime(movie.runtime);
    const rating=
    movie.vote_average && movie.vote_average>0
    ? movie.vote_average.toFixed(1):null;
    const backdrop=tmdbImage(movie.backdrop_path,"w1280");
    const poster=tmdbImage(movie.poster_path,"w500");
    return (
        <article>
            <div className="relative mb-8 overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="relative aspect-16/9 min-h-[220px] w-full sm:min-h-[280px]">
                    {backdrop?(
                        <Image
                        src={backdrop}
                        alt=""
                        fill
                        priority
                        sizes="(max-width:1280px) 100vw,1280px"
                        className="object-cover"
                        />
                    ):(
                        <div className="absolute inset-0 bg-muted"/>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-muted to-transparent"/>
                </div>
                <div className="relative z-10 -mt-24 grid gap-6 px-4 pb-2 sm:-mt-32 sm:px-6 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
                    <div className="relative mx-auto aspect-2/3 w-40 overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-white/15 sm:mx-0 sm:w-full">
                    {poster?(
                        <Image
                        src={poster}
                        alt={movie.title}
                        fill
                        sizes="220px"
                        className="object-cover"
                        />
                    ):(
                        <div className="flex h-full items-center justify-center text-sm text-muted-forground">
                            No poster
                        </div>
                    )}
                    </div>
                    <div className="pb-2">
                        {movie.tagline&&(
                            <p className="mb-2 text-sm text-primary italic">
                                {movie.tagline}
                            </p>
                        )}
                        <h1 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
                            {movie.title}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                            <span className="rounded-full bg-white/8 px-3 py-1">
								{year}
							</span>
                            {rating&& (
                                <span>
                                    <Star className="size-3.5 fill-current"/>
                                    {rating}
                                </span>
                            )}
                        </div>
                        {movie.genres&&movie.genres.length>0&&(
                            <div className="mt-3">
                                {movie.genres.map(genre=>(
                                   <Link
										key={genre.id}
										href={`/genre/${genre.name}/${genre.id}`}
										className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
										{genre.name}
									</Link>
                                ))}
                            </div>
                        )}
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {movie.overview}
                        </p>
                        {trailer&&(
                            <Link 
                            href="#trailer"
                            className={cn(
                                buttonVariants({size:"lg"}),
                                "mt-5 rounded-fill px-5",
                        )}>
                            <Play className="fill-current"/>
                            Watch trailer
                        </Link>
                        )}

                    </div>
                </div>
            </div>
            {trailer&&(
                <MovieTrailer
                trailer={trailer}
                title={movie.title}
                />
            )}
            <PageHeader
				eyebrow="The company"
				title="Cast"
			/>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {cast.slice(0,12).map(person=>{
                    const photo=tmdbImage(person.profile_path,"w185");
                    return (
                        <Link
                        key={person.id}
                        href={`/person/${person.id}`}
                        className="group">
                            <div className="aspect-square w-24 overflow-hidden rounded-full bg-muted sm:w-32">
                                {photo ?(
                                    <Image 
                                    src={photo}
                                    alt={person.name}
                                    fill
                                    sizes="180px"
                                    className="object-cover r transition-transform duration-500 group-hover:scale-105"
                                    />
                                    ):(
                                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                            No photo
                                        </div>
                                )}
                            </div>
                            <p className="truncate text-sm font-medium">
                                {person.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                {person.character}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </article>
    );
}