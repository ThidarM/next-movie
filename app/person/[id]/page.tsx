import MovieGrid from "@/components/movie-grid";
import PageHeader from "@/components/page-header";
import { tmdbImage } from "@/lib/tmdb";
import type { MovieType,PersonType } from "@/types/global";
import Image from "next/image";
import type { Metadata } from "next";

async function fetchPerson(id:string):Promise<PersonType>{
    const res=await fetch(`https://api.themoviedb.org/3/person/${id}`,{
        headers:{
            Authorization:`Bearer ${process.env.TMDB_TOKEN}`
        },
    });
    return await res.json();
}

async function fetchCredits(id:string):Promise<MovieType[]>{
    const res=await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits`,
        {
            headers:{
                Authorization:`Bearer ${process.env.TMDB_TOKEN}`
            },
        },        
    );

    const data=await res.json();
    const credits:MovieType[]=data.cast??[];
    return credits
    .filter(movie=>movie.poster_path)
    .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
    .slice(0,18);
}

export async function generateMetadata({
    params,
}:{
    params:Promise<{id:string}>;
}):Promise<Metadata>{
    const {id}=await params;
    const person=await fetchPerson(id);
    return {title:person.name};
}

export default async function PersonPage({
    params,
}:{
    params:Promise<{id:string}>;
}){
    const {id}=await params;
    const person=await fetchPerson(id);
    const credits=await fetchCredits(id);
    const photo=tmdbImage(person.profile_path,"w500");

    return (
        <div>
            <section className="mb-10 grid gap-6 md:grid-cols-[220px_1fr] md:gap-8">
                <div className="relative aspect-[2/3] w-full max-w-[220px]">
                    {photo?(
                        <Image
                            src={photo}
                            alt={person.name}
                            fill
                            sizes="220px"
                            className="object-cover"
                        />
                    ):(
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No photo
                        </div>
                    )}
                </div>
                <div>
                    <p className="mb-1 text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
                        {person.known_for_department||"Cast"}
                    </p>
                    <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">
                        {person.name}
                    </h1>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {
                            person.birthday&&(
                                <span className="rounded-full bg-white/8 px-3 py-1">
                                    Born {person.birthday}
                                </span> 
                            )}
                        {
                            person.place_of_birth&&(
                                <span className="rounded-full bg-white/8 px-3 py-1">
                                    {person.place_of_birth}
                                </span>
                            )}    
                    </div>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {person.biography||"No biograpgy available."}
                    </p>
                </div>
            </section>
            <PageHeader
            eyebrow="Filmography"
            title="known for"
            />
            <MovieGrid
            movies={credits}
            empty="No credit title to show."
            />
        </div>
    );
}


