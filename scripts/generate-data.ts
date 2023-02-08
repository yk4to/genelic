import matter from "npm:gray-matter";
import { parse } from "https://deno.land/std@0.176.0/encoding/yaml.ts";
import { License } from "../types.ts";

const licenses: License[] = [];
for await (const dirEntry of Deno.readDir("./choosealicense.com/_licenses")) {
  const { data, content } = matter.read(`./choosealicense.com/_licenses/${dirEntry.name}`);
  const license = {
    ...data,
    content,
  } as License;
  licenses.push(license);
}

licenses.sort((a, b) => a["spdx-id"].localeCompare(b["spdx-id"]));

const licensesTs = `import { License } from "./types.ts";
export const licenses: License[] = ${JSON.stringify(licenses, null, 2)};
`
await Deno.writeTextFile("./licenses.ts", licensesTs);

console.log("licenses.ts generated");

const yml = await Deno.readTextFile("./choosealicense.com/_data/rules.yml");
const rules = parse(yml) as Record<string, string[]>;
const rulesTs = `import { Rules } from "./types.ts";
export const rules: Rules = ${JSON.stringify(rules, null, 2)};
`
await Deno.writeTextFile("./rules.ts", rulesTs);

console.log("rules.ts generated");