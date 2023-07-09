import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<div className="collapse collapse-arrow bg-base-200 w-52">
				<input type="checkbox" />
				<div className="collapse-title flex text-xs bg-red-600 py-2 h-1">
					Click me to show/hide content
				</div>
				<div className="collapse-content items-center bg-green-500">
					<a className="hover:cursor-pointer">hello</a>
				</div>
			</div>
		</main>
	);
}
