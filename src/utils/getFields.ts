import { getGitUserInfo, path, readPackage } from "../../deps.ts";
import readCargo from "./readCargo.ts";
import readPyProject from "./readPyProject.ts";

type Meta = {
	author?: string | undefined;
	email?: string | undefined;
	project?: string | undefined;
	description?: string | undefined;
	url?: string | undefined;
};

const getMeta = async (outputPath: string) => {
	let meta: Meta = {};

	const outputDir = path.dirname(outputPath);

	const gitInfo = await getGitUserInfo({ cwd: outputDir });
	if (gitInfo) {
		meta = {
			...meta,
			author: gitInfo.name,
			email: gitInfo.email,
		};
	}

	const pkgJson = await readPackage({ cwd: outputDir }).catch(() =>
		undefined
	);
	if (pkgJson) {
		meta = {
			...meta,
			author: pkgJson.author?.name,
			email: pkgJson.author?.email,
			project: pkgJson.name,
			description: pkgJson.description,
			url: pkgJson.homepage ??
				pkgJson.repository?.url.replace(/^git\+/, "").replace(
					/\.git$/,
					"",
				),
		};
	}

	const pyProjectToml = await readPyProject(outputDir);
	if (pyProjectToml) {
		const poetry = pyProjectToml.tool?.poetry;
		const author = poetry?.authors?.[0];
		meta = {
			...meta,
			author: author?.name,
			email: author?.email,
			project: poetry?.name,
			description: poetry?.description,
			url: poetry?.homepage ?? poetry?.repository,
		};
	}

	const cargoToml = await readCargo(outputDir);
	if (cargoToml) {
		const author = cargoToml.package?.authors?.[0];
		meta = {
			...meta,
			author: author?.name,
			email: author?.email,
			project: cargoToml.package?.name,
			description: cargoToml.package?.description,
			url: cargoToml.package?.homepage ?? cargoToml.package?.repository,
		};
	}

	return meta;
};

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
			default: meta.url,
		},
	];
};

export default getFields;
