import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	GroupingState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
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
import { Button } from "../ui/button";

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
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [grouping, setGrouping] = React.useState<GroupingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			grouping, // Requred for grouping
		},
		enableRowSelection: true,
		onGroupingChange: setGrouping, // Requred for grouping
		getGroupedRowModel: getGroupedRowModel(), // Requred for grouping
		getExpandedRowModel: getExpandedRowModel(), // Requred for grouping (Expandable rows)
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
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<div className="flex items-center">
													{header.column.getCanGroup() ? (
														<Button
															{...{
																onClick:
																	header.column.getToggleGroupingHandler(),
																className: "mr-2 bg-blue-400 p-1 h-fit",
															}}
														>
															{header.column.getIsGrouped() ? (
																<span>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		strokeWidth={1.5}
																		stroke="currentColor"
																		className="w-4 h-4"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
																		/>
																	</svg>
																	{header.column.getGroupedIndex()}
																</span>
															) : (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="w-4 h-4"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
																	/>
																</svg>
															)}
														</Button>
													) : null}
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</div>
											)}
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
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={
												cell.getIsGrouped()
													? "bg-red-300"
													: cell.getIsAggregated()
													? "bg-white"
													: cell.getIsPlaceholder()
													? "bg-blue-300"
													: "bg-white"
											}
										>
											{/* {flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)} */}
											{cell.getIsGrouped() ? (
												// If it's a grouped cell, add an expander and row count
												<>
													<Button
														{...{
															onClick: row.getToggleExpandedHandler(),
														}}
													>
														{row.getIsExpanded() ? "👇" : "👉"}{" "}
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}{" "}
														({row.subRows.length})
													</Button>
												</>
											) : cell.getIsAggregated() ? (
												// If the cell is aggregated, use the Aggregated
												// renderer for cell
												flexRender(
													cell.column.columnDef.aggregatedCell ??
														cell.column.columnDef.cell,
													cell.getContext()
												)
											) : cell.getIsPlaceholder() ? null : (
												// For cells with repeated values, render null
												// Otherwise, just render the regular cell
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
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
