import { Command, GithubProvider, UpgradeCommand } from "../../deps.ts";
import { version } from "../version.ts";

import generateCommand from "./generate.ts";
import infoCommand from "./info.ts";
import previewCommand from "./preview.ts";
import listCommand from "./list.ts";

export const glcCommand = () => {
	const info = new Command()
		.description("Show license info.")
		.arguments("[id:string]")
		.option("-t, --title <title:string>", "Use title instead of id.")
		.option("-w, --width <width:number>", "Set width.", { default: 80 })
		.action(infoCommand);

	const preview = new Command()
		.description("Preview license.")
		.arguments("[id:string]")
		.option("-t, --title <title:string>", "Use title instead of id.")
		.option("-w, --width <width:number>", "Set width.", { default: 80 })
		.option("-H, --highlight", "Highlight fields.")
		.action(previewCommand);

	const list = new Command()
		.description("List all licenses.")
		.option("-i, --id", "Show ids only.", { conflicts: ["title"] })
		.option("-t, --title", "Show titles only.", { conflicts: ["id"] })
		.action(listCommand);

	const upgrade = new UpgradeCommand({
		main: "mod.ts",
		args: ["-A"],
		provider: [
			new GithubProvider({ repository: "fus1ondev/genelic" }),
		],
	})
		.name("upgrade")
		.description(
			"Upgrade genelic. (Don't use this if you installed genelic from Homebrew.)",
		);

	return new Command()
		.name("glc")
		.version(version)
		.description("Generate a license file for your project.")
		.arguments("[id:string]")
		.option("-t, --title <title:string>", "Use title instead of id.")
		.option("-o, --output <output:string>", "Output file name.", {
			default: "LICENSE",
		})
		.option("-f, --force", "Overwrite existing license file.")
		.option("-p, --parents", "Create parent directories as needed.")
		.action(generateCommand)
		.command("info", info)
		.command("preview", preview)
		.command("list", list)
		.command("upgrade", upgrade);
};
