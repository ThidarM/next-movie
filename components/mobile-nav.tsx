"use client";

import { GenreLinks } from "@/components/genre-nav";
import { GenreType } from "@/types/global";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function MobileNav({ genres }: { genres: GenreType[] }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 lg:hidden"
				aria-expanded={open}
				aria-controls="mobile-genres"
				aria-label={open ? "Close genres" : "Open genres"}
				onClick={() => setOpen(value => !value)}>
				{open ? <X className="size-5" /> : <Menu className="size-5" />}
			</button>

			{open && (
				<div
					id="mobile-genres"
					className="fixed inset-x-0 top-[7.5rem] z-40 border-b border-white/10 bg-background/95 px-4 py-4 shadow-2xl backdrop-blur-xl sm:top-[4.25rem] sm:px-6 lg:hidden">
					<p className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
						Browse
					</p>
					<div className="max-h-[70vh] overflow-y-auto pr-1">
						<GenreLinks
							genres={genres}
							onNavigate={() => setOpen(false)}
						/>
					</div>
				</div>
			)}
		</>
	);
}