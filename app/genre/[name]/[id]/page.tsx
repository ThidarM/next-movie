import MovieGrid from "@/components/movie-grid";
import PageHeader from "@/components/page-header";
import { MovieType } from "@/types/global";
import type { Metadata } from "next";

async function fetchGenre(id:string):Promise<MovieType[]>{
    const res=await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
        headers:{
            Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
        },
    },
);
const data=await res.json();
return data.results??[];
}

export default async function Genre({
    params,
}:{
    params:Promise<{name:string,id:string}>;
}){
    const {id,name}=await params;
    const title=decodeURIComponent(name);
    const movies=await fetchGenre(id);

    return (
        <div>
            <PageHeader
                eyebrow="Genre"
                title={title}
                description={`A curated slice of ${title.toLowerCase()} cinema.`}
                />
            <MovieGrid movies={movies}/>
        </div>
    );
}
