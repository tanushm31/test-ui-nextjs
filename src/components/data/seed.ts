import { faker } from "@faker-js/faker";

import { labels, priorities, statuses } from "./data";
import { Task } from "../data/schema";

export function getTasks(length: number) {
	let tasks = [];
	if (length <= 1) {
		length = 1;
	}
	for (let i = 0; i < length; i++) {
		tasks.push({
			id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
			title: faker.hacker
				.phrase()
				.replace(/^./, (letter) => letter.toUpperCase()),
			status: faker.helpers.arrayElement(statuses).value,
			label: faker.helpers.arrayElement(labels).value,
			priority: faker.helpers.arrayElement(priorities).value,
		});
	}
	return tasks;
}
