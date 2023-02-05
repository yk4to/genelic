import { path, readPackage } from "../deps.ts";

const getMeta = async (outputPath: string) => {
  const outputDir = path.dirname(outputPath);
  const pkgJson = await readPackage({ cwd: outputDir }).catch(() => undefined);
  if (!pkgJson) {
    return {};
  }
  return {
    author: pkgJson.author?.name,
    email: pkgJson.author?.email,
    project: pkgJson.name,
    description: pkgJson.description,
    url: pkgJson.repository?.url.replace(/^git\+/, "").replace(/\.git$/, "") ?? pkgJson.homepage,
  };
}

const getFields = async (outputPath: string) => {
  const meta = await getMeta(outputPath);
  return [
    {
      tag: "fullname",
      description: "The full name or username of the repository owner",
      default: meta.author,
    },
    {
      tag: "login",
      description: "The repository owner's username",
      default: meta.author,
    },
    {
      tag: "email",
      description: "The repository owner's primary email address",
      default: meta.email,
    },
    {
      tag: "project",
      description: "The repository name",
      default: meta.project ?? path.basename(outputPath),
    },
    {
      tag: "description",
      description: "The description of the repository",
      default: meta.description,
    },
    {
      tag: "year",
      description: "The current year",
      default: new Date().getFullYear().toString(),
    },
    {
      tag: "projecturl",
      description: "The repository URL or other project website",
      default: meta.url
    },
  ]
}

export default getFields;
