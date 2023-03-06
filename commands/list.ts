import { Table, colors } from "../deps.ts";
import { licenses } from "../licenses.ts";

type Option = {
  id: boolean;
}

// deno-lint-ignore no-explicit-any
const listCommand = (option: any) => {
  const { id } = option as Option;
  if (id) {
    licenses.forEach((license) => console.log(license["spdx-id"]));
  } else {
    new Table()
    .header([colors.bold("Title"), colors.bold("SPDX ID")])
    .body(licenses.map((license) => [license.title, license["spdx-id"]]))
    .render();
  }
}

export default listCommand;