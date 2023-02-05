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
  logger.title(`--- ${license.title} (${license["spdx-id"]}) ---`);
  console.log(license.description);

  logger.bold("Permissions:");
  license.permissions?.forEach(logPermissionInfo);
  logger.bold("Conditions:");
  license.conditions?.forEach(logConditionInfo);
  logger.bold("Limitations:");
  license.limitations?.forEach(logLimitationInfo);
}

const logPermissionInfo = (permission: Permission) => {
  const emoji = () => {
    switch (permission) {
      case "commercial-use":
        return "💰";
      case "modifications":
        return "🛠";
      case "distribution":
        return "📦";
      case "private-use":
        return "🔒";
      case "patent-use":
        return "📜";
    }
  };
  const { label } = rules.permissions.find((rule) => rule.tag === permission)!;
  console.log(` ${emoji()} ${label}`);
};

const logConditionInfo = (condition: Condition) => {
  const { label } = rules.conditions.find((rule) => rule.tag === condition)!;
  console.log(` 📋 ${label}`);
};

const logLimitationInfo = (limitation: Limitation) => {
  const emoji = () => {
    switch (limitation) {
      case "trademark-use":
        return "🏷";
      case "liability":
        return "📋";
      case "patent-use":
        return "📜";
      case "warranty":
        return "⚖";
    }
  };
  const { label } = rules.limitations.find((rule) => rule.tag === limitation)!;
  console.log(` ${emoji()} ${label}`);
};

export default infoCommand;
