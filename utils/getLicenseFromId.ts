import { Select } from "../deps.ts";
import { licenses } from "../licenses.ts";
import logger from "../utils/logger.ts";

const getLicenseFromId = async (id: string | undefined) => {
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
