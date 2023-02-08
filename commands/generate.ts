import { Confirm, Input, path, fs, readPackage } from "../deps.ts";
import logger from "../utils/logger.ts";
import getLicenseFromId from "../utils/getLicenseFromId.ts";
import getFields from "../utils/getFields.ts";
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

  const outputExists = await Deno.stat(output).catch(() => false) !== false;
  const outputAbsolutePath = path.resolve(Deno.cwd(), output);
  const outputDir = path.dirname(outputAbsolutePath);
  const outputDirExists = await Deno.stat(outputDir).catch(() => false) !== false;

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
  
  const license = await getLicenseFromId(id, outputDir);

  if (info) {
    logLicenseInfo(license);
  }

  if (parents && !outputDirExists) {
    await fs.ensureDir(outputDir);
  }

  let content = license.content;

  const fields = await getFields(outputAbsolutePath);
  for (const field of fields) {
    if (content.includes(`[${field.tag}]`)) {
      const value = await Input.prompt({
        message: `[${field.tag}] ${field.description}:`,
        default: field.default,
      });
      if (value) {
        content = content.replaceAll(`[${field.tag}]`, value);
      } else {
        logger.warn(`[${field.tag}] is not set.`);
      }
    }
  }

  if (outputAbsolutePath.endsWith(".md")) {
    content = `# LICENSE\n\n\`\`\`\n${content}\n\`\`\``
  }

  await Deno.writeTextFile(outputAbsolutePath, content);

  logger.bold(`✨ License file "${outputAbsolutePath}" generated.`);
}

export default generateCommand;
