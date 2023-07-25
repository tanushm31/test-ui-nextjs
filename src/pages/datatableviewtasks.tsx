// import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "~/components/tasksTable/columns";
import { UserNav } from "~/components/tasksTable/user-nav";
import { taskSchema, type Task } from "~/components/data/schema";
import { getTasks } from "~/components/data/seed";
import DataTableTasks from "~/components/tasksTable/data-table";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
	title: "Tasks",
	description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
// async function getTasks() {
// 	const data =
// }

export default function TaskPage() {
	const [tasks, setTasks] = useState<Task[]>([]);
	useEffect(() => {
		setTasks(getTasks(100));
	}, []);

	return (
		<>
			{/* <div className="md:hidden">
				<Image
					src="/examples/tasks-light.png"
					width={1280}
					height={998}
					alt="Playground"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/tasks-dark.png"
					width={1280}
					height={998}
					alt="Playground"
					className="hidden dark:block"
				/>
			</div> */}
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Welcome back!
						</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTableTasks data={tasks} columns={columns} />
			</div>
		</>
	);
}
