export default function Loading(){
    return (
        <div className="animate-pulse">
            <div className="mb-8 aspect-16/9 rounded-3xl bg-muted sm:aspect-21/9"/>
            <div className="mb-6 h-8 w-48 rounded-lg bg-muted" />
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="aspect-2/3 rounded-2xl bg-muted"
					/>
				))}
			</div>
        </div>
    );
}