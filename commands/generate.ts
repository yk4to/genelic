import { Confirm, path, fs } from "../deps.ts";
import logger from "../utils/logger.ts";
import getLicenseFromId from "../utils/getLicenseFromId.ts";
import { logLicenseInfo } from "./info.ts";

type Option = {
  output: string;
  force: boolean | undefined;
  info: boolean | undefined;
  parents: boolean | undefined;
}

// deno-lint-ignore no-explicit-any
const generateCommand = async (option: any, id: string | undefined) => {
  const { output, force, info, parents } = option as Option;

  const outputExists = await Deno.stat(output).catch(() => false);
  const outputDir = path.dirname(output);
  const outputDirExists = await Deno.stat(outputDir).catch(() => false);

  if (!force && outputExists) {
    const overwrite = await Confirm.prompt({
      message: `File "${output}" already exists. Overwrite?`,
    });
    if (!overwrite) {
      Deno.exit(0);
    }
  }

  if (!parents && !outputDirExists) {
    logger.error(`Directory "${outputDir}" does not exist.`);
    Deno.exit(1);
  }

  const license = await getLicenseFromId(id);

  if (info) {
    logLicenseInfo(license);
  }

  if (parents && !outputDirExists) {
    await fs.ensureDir(outputDir);
  }

  if (output.endsWith(".md")) {
    await Deno.writeTextFile(output, `# LICENSE\n\n\`\`\`\n${license.content}\n\`\`\``);
  } else {
    await Deno.writeTextFile(output, license.content);
  }

  logger.bold(`✨ License file "${output}" generated.`);
}

export default generateCommand;
