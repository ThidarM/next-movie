import MovieCard from "@/components/movie-card";
import { MovieType } from "@/types/global";

export default function MovieGrid({
    movies,
    empty="Nothing to show yet.",
}:{
    movies:MovieType[];
    empty?:string;
}){
    if(!movies?.length){
        return (
            <div className="rounded-2xl border border-dashed border-white/12 bg-card/40 px-6 py-16 text-center text-muted-foreground">
                {empty}
            </div>
        );
    }
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map(movie=>(
                <MovieCard 
                key={movie.id}
                movie={movie}
                />
            ))}
        </div>
    );
}