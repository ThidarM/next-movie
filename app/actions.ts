"use server";
import {redirect} from "next/navigation";
export async function searchMovies(formData:FormData){
    const q=String(formData.get("q")??"").trim();
    if(!q) redirect("/");
    redirect(`/search?q=${encodeURIComponent(q)}`);
}