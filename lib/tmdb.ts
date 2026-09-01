import { MovieType, VideoType } from "@/types/global";

export const tmdbImage=(
    path: string | null | undefined,
    size: "w185" | "w342" | "w500" | "w780" | "w1280" | "original" = "w342",
)=>(path?`https://image.tmdb.org/t/p/${size}${path}`:null);

export const yearFromDate=(date?:string)=>
    date?.split("-")[0]||"TBA";

export const pickTrailer=(video?:VideoType[])=>{
    if(!video?.length) return null;

    const youtube=video.filter(
        video=>video.site==="YouTube"&&Boolean(video.key),
    );
    const ofType=(type:String)=>
        youtube.filter(video=>video.type===type);
    const trailers=ofType("Trailer");

    return (
        trailers.find(video=>video.official)??
        trailers[0]??
        ofType("Teaser")[0]??
        ofType("Clip")[0]??
        youtube[0]??
        null
    );
};

export const youtubeThumb=(key:string)=>
    `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;

export const formatRuntime=(minutes?:number)=>{
    if(!minutes) return null;
    const hours=Math.floor(minutes/60);
    const rest=minutes%60;
    if(!hours) return `${rest}m`;
    return rest?`${hours}h${rest}m`:`${hours}h`;
}
