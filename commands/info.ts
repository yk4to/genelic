import { Table, colors } from "../deps.ts";
import { License, Permission, Condition, Limitation } from "../types.ts";
import logger from "../utils/logger.ts";
import getLicenseFromId from "../utils/getLicenseFromId.ts";
import { rules } from "../rules.ts";

type Option = {
  id: string | undefined;
}

// deno-lint-ignore no-explicit-any
const infoCommand = async (option: any) => {
  const { id } = option as Option;
  const license = await getLicenseFromId(id);
  logLicenseInfo(license);
}

export const logLicenseInfo = (license: License) => {
  const { title, description, permissions, conditions, limitations } = license;
  logger.title(`--- ⚖ ${title} (${license["spdx-id"]}) ---`);
  console.log(description);

  const largestLength = Math.max(permissions?.length ?? 0, conditions?.length ?? 0, limitations?.length ?? 0);

  new Table()
    .header([colors.bold.green("Permissions"), colors.bold.red("Limitations"), colors.bold.blue("Conditions")])
    .body(
      Array.from({ length: largestLength }, (_, i) => [
        permissions?.[i] ? colors.green("✔︎ ") + getPermissionLabel(permissions?.[i]) : (i === 0 ? "none" : ""),
        limitations?.[i] ? colors.red("✖︎ ") + getLimitationLabel(limitations?.[i]) : (i === 0 ? "none" : ""),
        conditions?.[i] ? colors.blue("ℹ︎ ") + getConditionLabel(conditions?.[i]) : (i === 0 ? "none" : ""),
      ])
    )
    .padding(2)
    .render();
};

const getPermissionLabel = (permission: Permission) => {
  const rule = rules.permissions.find((rule) => rule.tag === permission);
  return rule?.label ?? "";
};

const getConditionLabel = (condition: Condition) => {
  const rule = rules.conditions.find((rule) => rule.tag === condition);
  return rule?.label ?? "";
};

const getLimitationLabel = (limitation: Limitation) => {
  const rule = rules.limitations.find((rule) => rule.tag === limitation);
  return rule?.label ?? "";
};

export default infoCommand;
