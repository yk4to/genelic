import fetch from "node-fetch";
import * as fs from "fs";
import signale, { Signale } from "signale";
import prompts from "prompts";
import { isExist } from "../utils/isExist";
import { License } from "../types/License";

export const generate = async (id: string, isForced: boolean, isMarkdown: boolean) => {
  const url = `https://spdx.org/licenses/${id}.json`;

  try {
    const response = await fetch(url);
    const license = await response.json() as License;

    signale.success(`"${license.name}" was found!`);
  
    const createInteractive = new Signale({interactive: true});
  
    const licenseFileName = isMarkdown ? 'LICENSE.md' : 'LICENSE';
    const licenseText = isMarkdown ? '# LICENSE\n\n' + license.licenseText : license.licenseText;
  
    createInteractive.await(`Creating "${licenseFileName}"...`);
  
    if (isExist(licenseFileName)) {
      createInteractive.warn(`"${licenseFileName}" already exists.`);
      if (!isForced) {
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'Overwrite existing LICENSE file??',
          initial: true
        });
        if (!overwrite) {
          createInteractive.info('Canceled.');
          return;
        }
      }
    }

    fs.writeFileSync(licenseFileName, licenseText);

    createInteractive.success(`"${licenseFileName}" was created!`);

    signale.info(`See also: ${license.seeAlso.join(', ')}`);
    signale.note('Don\'t forget to replace the press holder with your value.');

  } catch(error) {
    signale.error(error);
  }
};
