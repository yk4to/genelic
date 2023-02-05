import { Command } from "./deps.ts";

import generateCommand from "./commands/generate.ts";
import infoCommand from "./commands/info.ts";

const info = new Command()
  .description("Show license info.")
  .arguments("[id:string]")
  .action(infoCommand);

await new Command()
  .name("genelic")
  .version("0.0.1")
  .description("Generate a license file for your project.")
  .arguments("[id:string]")
  .option("-o, --output <output:string>", "Output file name.",{ default: "LICENSE" })
  .option("-f, --force", "Overwrite existing license file.")
  .option("-i, --info", "Log license info.")
  .option("-p, --parents", "Create parent directories as needed.")
  .action(generateCommand)
  .command("info", info)
  .parse();