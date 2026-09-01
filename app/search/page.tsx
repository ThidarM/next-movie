import MovieGrid from "@/components/movie-grid";
import PageHeader from "@/components/page-header";
import { MovieType } from "@/types/global";
import type { Metadata } from "next";

async function fetchSearch(q:string):Promise<MovieType[]>{
    const res=await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}`,
        {
            headers:{
                Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    );
    const data=await res.json();
    return data.results??[];
}

export async function Search({searchParams,

}:{searchParams:Promise<{q:string}>;
}) {
    const q=(await searchParams).q??"";
    const movies=q?await fetchSearch(q):[];
    return (
        <div>
            <PageHeader
            eyebrow="Search"
            title={q?`Results for "${q}"`:"Search"}
            description={
                q
                ?`${movies.length}title${movies.length===1?"":"s"}matched your query.`
                :"Type a title in the search bar to get started."
            }
            />
            <MovieGrid
            movies={movies}
            empty={q?`No Moive Found For "${q}".`:"Search for a film"}
            />
        </div>
    );
}