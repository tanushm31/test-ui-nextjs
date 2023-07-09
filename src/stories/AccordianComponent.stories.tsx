import AccordianComponent from "../components/AccordianComponent";

// export default {
// 	title: "AccordianComponent",
// 	component: AccordianComponent,
// };

// export const AccordianComponentStory = () => (
// 	// <AccordianComponent
// 	// 	title="Production Form"
// 	// 	subLinks={[{ title: "Link 1", link: "" }]}
// 	// />
//     args: {
//         title: "Production Form",
//         subLinks: [{ title: "Link 1", link: "" }],
//     }
// );

// // Button.stories.ts|tsx

// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
const meta: Meta<typeof AccordianComponent> = {
	component: AccordianComponent,
};

export default meta;
type Story = StoryObj<typeof AccordianComponent>;

export const Primary: Story = {
	args: {
		title: "Production Form",
		subLinks: [
			{ title: "Link 1", link: "" },
			{ title: "Link 2", link: "" },
		],
	},
};
