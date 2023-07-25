import { faker } from "@faker-js/faker";

export type Record = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "completed" | "todo";
	email: string;
};

export function generateTestTableData(n: number): Record[] {
	const records: Record[] = [];

	for (let i = 0; i < n; i++) {
		const record: Record = {
			id: faker.person.fullName(),
			amount: faker.number.int({ min: 0, max: 100 }),
			status: faker.helpers.arrayElement([
				"pending",
				"processing",
				"completed",
				"todo",
			]),
			email: faker.internet.email(),
		};

		records.push(record);
	}

	return records;
}
