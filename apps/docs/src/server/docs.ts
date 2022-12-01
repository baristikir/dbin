export function loadDocs() {
	// return import.meta.glob("../../../docs/**/*.md", { as: "raw", eager: true });
}

interface DocsConfig {
	docs: Record<string, unknown>;
	sections: Set<{ title: string; slug: string }>;
}

export const config: DocsConfig = {
	docs: {},
	sections: new Set(),
};
