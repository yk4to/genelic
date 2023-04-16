import { path, toml } from "../../deps.ts";

type CargoToml = {
	package: {
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
};

const readCargo = async (cwd: string) => {
	const cargoToml = await Deno.readTextFile(path.join(cwd, "Cargo.toml"))
		.catch(() => undefined);
	if (cargoToml) {
		// deno-lint-ignore no-explicit-any
		const meta = toml.parse(cargoToml) as any;
		return {
			package: {
				...meta.package,
				authors: meta.package?.authors?.map((author: string) => {
					const match = author.match(/(.*) <(.*@.*)>/);
					return {
						name: match?.[1] ?? author,
						email: match?.[2],
					};
				}),
			},
		} as CargoToml;
	}
	return undefined;
};

export default readCargo;
