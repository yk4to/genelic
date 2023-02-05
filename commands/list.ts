import { Table, colors } from "../deps.ts";
import { licenses } from "../licenses.ts";

const listCommand = () => {
  new Table()
    .header([colors.bold("Title"), colors.bold("SPDX ID")])
    .body(licenses.map((license) => [license.title, license["spdx-id"]]))
    .render();
}

export default listCommand;