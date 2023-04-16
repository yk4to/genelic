import { path, toml } from "../../deps.ts";

type PyProjectToml = {
  tool: {
    poetry: {
      name: string | undefined;
      authors: {
        name: string | undefined;
        email: string | undefined;
      }[];
      description: string | undefined;
      homepage: string | undefined;
      repository: string | undefined;
      license: string | undefined;
    } | undefined;
  } | undefined;
};

const readPyProject = async (cwd: string) => {
  const pyProjectToml = await Deno.readTextFile(
    path.join(cwd, "pyproject.toml"),
  ).catch(() => undefined);
  if (pyProjectToml) {
    // deno-lint-ignore no-explicit-any
    const meta = toml.parse(pyProjectToml) as any;
    return {
      tool: {
        poetry: {
          ...meta.tool?.poetry,
          authors: meta.tool?.poetry?.authors?.map(
            (author: string) => {
              const match = author.match(/(.*) <(.*@.*)>/);
              return {
                name: match?.[1] ?? author,
                email: match?.[2],
              };
            },
          ),
        },
      },
    } as PyProjectToml;
  }
  return undefined;
};

export default readPyProject;
