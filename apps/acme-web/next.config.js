/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		relay: {
			src: "./",
			language: "typescript",
			artifactDirectory: "__generated__",
		},
	},
	experimental: {
		transpilePackages: ["@dbin/ui"],
	},
};

module.exports = nextConfig;
