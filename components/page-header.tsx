export default function PageHeader({
	eyebrow,
	title,
	description,
	as = "h1",
}: {
	eyebrow?: string;
	title: string;
	description?: string;
	as?: "h1" | "h2";
}) {
	const Heading = as;
	return (
		<header className="mb-6 sm:mb-8">
			{eyebrow && (
				<p className="mb-1 text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
					{eyebrow}
				</p>
			)}
			<Heading className="font-heading text-2xl tracking-tight text-balance sm:text-3xl">
				{title}
			</Heading>
			{description && (
				<p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
					{description}
				</p>
			)}
		</header>
	);
}