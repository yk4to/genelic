import { Command } from "./deps.ts";

await new Command()
  .name("genelic")
  .version("0.0.1")
  .description("Generate a license file for your project.")
  .parse();