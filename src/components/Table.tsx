import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

// import {
//     Column,
//     Table,
//     useReactTable,
//     ColumnFiltersState,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getFacetedRowModel,
//     getFacetedUniqueValues,
//     getFacetedMinMaxValues,
//     getPaginationRowModel,
//     sortingFns,
//     getSortedRowModel,
//     FilterFn,
//     SortingFn,
//     ColumnDef,
//     flexRender,
//     FilterFns,
//   } from '@tanstack/react-table'

import {
	RankingInfo,
	rankItem,
	compareItems,
} from "@tanstack/match-sorter-utils";

import React, { useState } from "react";

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};
type ITableProps = {
	data?: string[];
	columns?: string[];
};
const TableComponent: React.FC<ITableProps> = (props) => {
	const [data] = useState<Person[]>([
		{
			firstName: "tanner",
			lastName: "linsley",
			age: 24,
			visits: 100,
			status: "In Relationship",
			progress: 50,
		},
		{
			firstName: "tandy",
			lastName: "miller",
			age: 40,
			visits: 40,
			status: "Single",
			progress: 80,
		},
		{
			firstName: "joe",
			lastName: "dirte",
			age: 45,
			visits: 20,
			status: "Complicated",
			progress: 10,
		},
	]);
	const columnHelper = createColumnHelper<Person>();
	const columns = [
		columnHelper.accessor("firstName", {
			header: () => <span>First Name</span>,
			cell: (item) => item.getValue(),
			footer: (item) => item.column.id,
		}),
		columnHelper.accessor((row) => row.lastName, {
			id: "lastName",
			cell: (item) => (
				<span className="capitalize">{item.getValue()}</span>
			),
			header: () => <span>Last Name</span>,
			footer: (item) => item.column.id,
		}),
		columnHelper.accessor("age", {
			header: () => "Age",
			cell: (item) => item.renderValue(),
			footer: (item) => item.column.id,
		}),
		columnHelper.accessor("visits", {
			header: () => <span>Visits</span>,
			footer: (item) => item.column.id,
		}),
		columnHelper.accessor("status", {
			header: "Status",
			footer: (item) => item.column.id,
		}),
		columnHelper.accessor("progress", {
			header: "Profile Progress",
			footer: (item) => item.column.id,
		}),
	];
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="bg-white p-5 text-black">
			<table>
				<thead className="bg-gray-300">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th className="px-10" key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext() // This getContext helps us set up the properties like filtering, sorting, etc.
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									className="px-3 border-2 border-black"
									key={cell.id}
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	);
};

export default TableComponent;
