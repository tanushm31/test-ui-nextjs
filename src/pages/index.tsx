import Image from "next/image";
import { Inter } from "next/font/google";
import { Payment, columns } from "~/components/ui/columns";
import { DataTable } from "~/components/ui/data-table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const data: Payment[] = [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
		{
			id: "728ed52f",
			amount: 100,
			status: "processing",
			email: "m@example.com",
		},
	];

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			{/* <div className="collapse collapse-arrow bg-base-200 w-52">
				<input type="checkbox" />
				<div className="collapse-title flex text-xs bg-red-600 py-2 h-1">
					Click me to show/hide content
				</div>
				<div className="collapse-content items-center bg-green-500">
					<a className="hover:cursor-pointer">hello</a>
				</div>
			</div> */}
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</main>
	);
}
