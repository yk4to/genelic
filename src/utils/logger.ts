import { colors } from "../../deps.ts";

const error = colors.bold.red;
const warn = colors.bold.yellow;
const info = colors.bold.blue;
const bold = colors.bold;

const logger = {
	error: (message: string) => {
		console.error(error.underline("ERROR"), message);
	},
	warn: (message: string) => {
		console.warn(warn.underline("WARN"), message);
	},
	info: (message: string) => {
		console.log(info.underline("INFO"), message);
	},
	bold: (message: string) => {
		console.log(bold(message));
	},
};

export default logger;
