export type License = {
	// Required
	title: string;
	"spdx-id": string;
	description: string;
	how: string;
	using: {
		[key: string]: string;
	} | null;
	permissions: Permission[];
	conditions: Condition[];
	limitations: Limitation[];
	// Optional
	featured?: boolean;
	hidden?: boolean;
	nickname?: string;
	note?: string;
	redirect_from?: string;

	content: string;
};

export type Permission =
	| "commercial-use"
	| "modifications"
	| "distribution"
	| "private-use"
	| "patent-use";

export type Condition =
	| "include-copyright"
	| "include-copyright--source"
	| "document-changes"
	| "disclose-source"
	| "network-use-disclose"
	| "same-license"
	| "same-license--file"
	| "same-license--library";

export type Limitation =
	| "trademark-use"
	| "liability"
	| "patent-use"
	| "warranty";

export type Rules = {
	permissions: {
		description: string;
		label: string;
		tag: Permission;
	}[];
	conditions: {
		description: string;
		label: string;
		tag: Condition;
	}[];
	limitations: {
		description: string;
		label: string;
		tag: Limitation;
	}[];
};
