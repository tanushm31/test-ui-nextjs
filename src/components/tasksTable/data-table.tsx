import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	ColumnResizeMode,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function DataTableTasks<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnResizeMode, setColumnResizeMode] =
		React.useState<ColumnResizeMode>("onChange");

	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			// columnSizing: { mode: columnResizeMode },
			columnFilters,
		},
		enableRowSelection: true,
		columnResizeMode: columnResizeMode,
		enableColumnResizing: true,
		// enableResizing: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar table={table} />
			<div className="rounded-md border">
				<Table
					{...{
						style: {
							width: table.getCenterTotalSize(),
						},
					}}
				>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="border-2 border-gray-400"
											{...{
												style: {
													width: header.getSize(),
												},
											}}
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
											<div
												{...{
													onMouseDown:
														header.getResizeHandler(),
													onTouchStart:
														header.getResizeHandler(),
													className: `resizer ${
														header.column.getIsResizing()
															? "isResizing"
															: ""
													}`,
													style: {
														transform:
															columnResizeMode ===
																"onEnd" &&
															header.column.getIsResizing()
																? `translateX(${
																		table.getState()
																			.columnSizingInfo
																			.deltaOffset
																  }px)`
																: "",
													},
												}}
											/>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											{...{
												style: {
													width: cell.column.getSize(),
												},
											}}
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									style={{}}
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
