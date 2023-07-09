import React from "react";
type ISublinks = {
	title: string;
	link: string;
};
type IAccodianComponentProps = {
	title: string;
	subLinks: ISublinks[];
};

const AccodianComponent: React.FC<IAccodianComponentProps> = (props) => {
	return (
		<div className="collapse collapse-arrow bg-base-200 w-52 text-white">
			<input type="checkbox" />
			<div className="collapse-title flex text-xs bg-red-600 py-2 h-1">
				{props.title}
			</div>
			<div className="collapse-content items-center bg-green-500">
				<ul className="flex flex-col">
					<li>
						{props.subLinks.map((subLink) => {
							return (
								<a
									key={subLink.title}
									href={subLink.link}
									className="hover:cursor-pointer"
								>
									{subLink.title}
								</a>
							);
						})}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AccodianComponent;
