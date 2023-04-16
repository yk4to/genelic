import { glcCommand } from "./src/commands/glc.ts";

if (import.meta.main) {
	await glcCommand().parse(Deno.args);
}
