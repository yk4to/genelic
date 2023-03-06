import { Table, colors } from "../deps.ts";
import getLicenseFromId from "../utils/getLicenseFromId.ts";

type Option = {
  width: number;
  highlight: boolean;
}

// deno-lint-ignore no-explicit-any
const previewCommand = async (option: any, id: string | undefined) => {
  let { width, highlight } = option as Option;
  const fzfWidth = Deno.env.get("FZF_PREVIEW_COLUMNS");
  width = fzfWidth ? parseInt(fzfWidth) : width;
  width = width > 0 ? width : 80;

  let { content }  = await getLicenseFromId(id, Deno.cwd());

  if (highlight) {
    const fields = ["fullname", "login", "email", "project", "description", "year", "projecturl"];

    fields.forEach((field) => {
      content = content.replace(`[${field}]`, colors.gray("[") + colors.bold.brightMagenta(field) + colors.gray("]"));
    });
  }

  new Table([content])
    .maxColWidth(width)
    .render();
}

export default previewCommand;
