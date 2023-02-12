import { Confirm, Select, readPackage } from "../deps.ts";
import { licenses } from "../licenses.ts";
import logger from "../utils/logger.ts";
import readCargo from "./readCargo.ts";
import readPyProject from "./readPyProject.ts";

const getLicenseFromId = async (id: string | undefined, cwd: string) => {
  const pkgJson = await readPackage({ cwd }).catch(() => undefined);

  if (pkgJson?.license) {
    const useFoundLicense = await Confirm.prompt({
      message: `License "${pkgJson.license}" is set in package.json. Use it?`,
    });
    if (useFoundLicense) {
      id = pkgJson.license;
    }
  }

  const pyProjectToml = await readPyProject(cwd);

  if (pyProjectToml) {
    const license = pyProjectToml.tool?.poetry?.license;
    if (license) {
      const useFoundLicense = await Confirm.prompt({
        message: `License "${license}" is set in pyproject.toml. Use it?`,
      });
      if (useFoundLicense) {
        id = license;
      }
    }
  }

  const cargoToml = await readCargo(cwd);
  if (cargoToml) {
    console.log(cargoToml);
    const license = cargoToml.package?.license;
    if (license) {
      const useFoundLicense = await Confirm.prompt({
        message: `License "${license}" is set in Cargo.toml. Use it?`,
      });
      if (useFoundLicense) {
        id = license;
      }
    }
  }

  id = id ?? await Select.prompt({
    message: "Select a license:",
    options: licenses.map((license) => ({
      name: license.title,
      value: license["spdx-id"],
    })),
  });
  if (!id) {
    logger.error("No license selected.");
    Deno.exit(1);
  }

  const license = licenses.find((license) => license["spdx-id"].toLowerCase() === id?.toLowerCase());
  if (!license) {
    logger.error(`License with id "${id}" not found.`);
    Deno.exit(1);
  }
  return license;
}

export default getLicenseFromId;
