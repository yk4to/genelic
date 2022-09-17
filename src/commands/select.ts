import fetch from "node-fetch";
import signale from "signale";
import prompts from "prompts";
import { License } from "../types/License";
import { generate } from "./generate";

export const select = async (isForced: boolean, isMarkdown: boolean) => {
  try {
    const { licenses } = await fetch("https://spdx.org/licenses/licenses.json").then((res) => res.json());
    const licenseChoices = licenses.map((license: License) => ({
      title: license.name,
      value: license.licenseId,
      descripton: undefined,
    })).sort((a: any, b: any) => a.title.localeCompare(b.title));

    const { licenseId } = await prompts({
      type: 'select',
      name: 'licenseId',
      message: 'Pick a license',
      choices: licenseChoices,
      initial: 1
    });
    console.log(licenseId);
    generate(licenseId, isForced, isMarkdown);
  } catch(error) {
    signale.error(error);
  }
};
