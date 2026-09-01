import { ImageResponse } from "next/og";

export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";
export const alt = "Next Movie";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#e11d48",
					borderRadius: 6,
				}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width={22}
					height={22}
					fill="none"
					stroke="#ffffff"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round">
					<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
					<path d="m6.2 5.3 3.1 3.9" />
					<path d="m12.4 3.4 3.1 4" />
					<path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
				</svg>
			</div>
		),
		{
			...size,
		},
	);
}
