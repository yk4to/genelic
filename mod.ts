import { Command } from "./deps.ts";
import { version } from "./version.ts";

import generateCommand from "./commands/generate.ts";
import infoCommand from "./commands/info.ts";
import listCommand from "./commands/list.ts";

const cli = async () => {
  const info = new Command()
    .description("Show license info.")
    .arguments("[id:string]")
    .action(infoCommand);

  const list = new Command()
    .description("List all licenses.")
    .action(listCommand);

  await new Command()
    .name("genelic")
    .version(version)
    .description("Generate a license file for your project.")
    .arguments("[id:string]")
    .option("-o, --output <output:string>", "Output file name.",{ default: "LICENSE" })
    .option("-f, --force", "Overwrite existing license file.")
    .option("-i, --info", "Log license info.")
    .option("-p, --parents", "Create parent directories as needed.")
    .action(generateCommand)
    .command("info", info)
    .command("list", list)
    .parse();
}

if (import.meta.main) {
  cli();
}