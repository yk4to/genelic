import { colors, Table } from "../../deps.ts";
import { licenses } from "../generated/licenses.ts";

type Option = {
	id: boolean;
	title: boolean;
};

// deno-lint-ignore no-explicit-any
const listCommand = (option: any) => {
	const { id, title } = option as Option;
	if (id) {
		licenses.forEach((license) => console.log(license["spdx-id"]));
	} else if (title) {
		licenses.forEach((license) => console.log(license.title));
	} else {
		new Table()
			.header([colors.bold("Title"), colors.bold("SPDX ID")])
			.body(
				licenses.map((license) => [license.title, license["spdx-id"]]),
			)
			.render();
	}
};

export default listCommand;
