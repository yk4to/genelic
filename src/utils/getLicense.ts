import { Confirm, readPackage, Select } from "../../deps.ts";
import { licenses } from "../generated/licenses.ts";
import logger from "../utils/logger.ts";
import readCargo from "./readCargo.ts";
import readPyProject from "./readPyProject.ts";

const getLicense = async (
  id: string | undefined,
  title: string | undefined,
  cwd: string,
) => {
  if (!id) {
    id = licenses.find((license) => license.title === title)?.["spdx-id"];
  }

  if (!id) {
    const pkgJson = await readPackage({ cwd }).catch(() => undefined);
    id = await askToUseFoundLicense("package.json", pkgJson?.license);
  }

  if (!id) {
    const pyProjectToml = await readPyProject(cwd);
    id = await askToUseFoundLicense(
      "pyproject.toml",
      pyProjectToml?.tool?.poetry?.license,
    );
  }

  if (!id) {
    const cargoToml = await readCargo(cwd);
    id = await askToUseFoundLicense(
      "Cargo.toml",
      cargoToml?.package?.license,
    );
  }

  if (!id) {
    id = await Select.prompt({
      message: "Select a license:",
      options: licenses.map((license) => ({
        name: license.title,
        value: license["spdx-id"],
      })),
    });
  }

  if (!id) {
    logger.error("No license selected.");
    Deno.exit(1);
  }

  const license = licenses.find((license) => license["spdx-id"].toLowerCase() === id?.toLowerCase());
  if (!license) {
    logger.error(`License with id "${id}" not found.`);
    Deno.exit(1);
  }

  console.log(`${license.title} (${license["spdx-id"]}) has been selected.`);

  return license;
};

const askToUseFoundLicense = async (
  fileName: string,
  licenseId: string | undefined,
) => {
  const useFoundLicense = await Confirm.prompt({
    message: `License "${licenseId}" is set in ${fileName}. Use it?`,
  });
  return useFoundLicense ? licenseId : undefined;
};

export default getLicense;
