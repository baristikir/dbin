/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@dbin/ui"],
	compiler: {
		relay: {
			src: "./",
			language: "typescript",
			artifactDirectory: "__generated__",
		},
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
