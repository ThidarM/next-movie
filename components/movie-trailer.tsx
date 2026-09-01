"use client";

import { youtubeThumb } from "@/lib/tmdb";
import type { VideoType } from "@/types/global";
import {Play} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MovieTrailer({
    trailer,
    title,
    }:{
        trailer:VideoType;
        title:string;
    }){
        const [playing,setPlaying]=useState(false);
        const thumb=youtubeThumb(trailer.key);

        return(
            <section id="trailer" className="mb-10 scroll-mt-24">
                <p className="mb-1 text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
                    Watch
                </p>
                <h2 className="font-heading mb-4 text-2xl tracking-tight sm:text-3xl">
				Trailer
			    </h2>
                <div className="overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 sm:rounded-3xl">
				<div className="relative aspect-video">
					{playing ? (
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
							title={trailer.name || `${title} trailer`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="absolute inset-0 size-full"
						/>
					) : (
						<button
							type="button"
							onClick={() => setPlaying(true)}
							className="group absolute inset-0 cursor-pointer">
							<Image
								src={thumb}
								alt=""
								fill
								sizes="(max-width: 1280px) 100vw, 960px"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
							<span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
								<span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105 sm:size-20">
									<Play className="size-7 fill-current sm:size-8" />
								</span>
								<span className="max-w-[80%] text-center text-sm font-medium sm:text-base">
									Play {trailer.name || "trailer"}
								</span>
							</span>
						</button>
					)}
				</div>
			</div>
            </section>
        )
    }