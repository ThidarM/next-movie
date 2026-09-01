import { searchMovies } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchForm({
	className,
	defaultValue,
	id = "q",
}: {
	className?: string;
	defaultValue?: string;
	id?: string;
}) {
	return (
		<form
			action={searchMovies}
			className={`relative ${className ?? ""}`}>
			<label className="sr-only" htmlFor={id}>
				Search movies
			</label>
			<Input
				id={id}
				name="q"
				defaultValue={defaultValue}
				placeholder="Search titles..."
				className="h-10 rounded-full bg-white/6 pr-12 text-sm placeholder:text-muted-foreground/80"
			/>
			<Button
				type="submit"
				size="icon"
				className="absolute top-0.5 right-0.5 size-9 rounded-full"
				aria-label="Search">
				<Search />
			</Button>
		</form>
	);
}