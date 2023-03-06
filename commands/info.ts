import { Table, colors } from "../deps.ts";
import { Permission, Condition, Limitation } from "../types.ts";
import getLicense from "../utils/getLicense.ts";
import { rules } from "../rules.ts";

type Option = {
  width: number;
  title: string | undefined;
}

// deno-lint-ignore no-explicit-any
const infoCommand = async (option: any, id: string | undefined) => {
  let { width, title: _title } = option as Option;
  const fzfWidth = Deno.env.get("FZF_PREVIEW_COLUMNS");
  width = fzfWidth ? parseInt(fzfWidth) : width;
  width = width > 0 ? width : 80;

  const license = await getLicense(id, _title, Deno.cwd());
  const { title, description, permissions, conditions, limitations } = license;
  
  new Table()
    .header([colors.bold.brightBlue(`⚖ ${title} (${license["spdx-id"]})`)])
    .body([[],[description]])
    .maxColWidth(width)
    .render();

  console.log('\n');

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
    .maxColWidth(width / 3)
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
