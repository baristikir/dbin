/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		relay: {
			src: "./",
			language: "typescript",
			artifactDirectory: "__generated__",
		},
	},
	experimental: {
		// appDir: true,
		transpilePackages: ["@dbin/ui"],
	},
};

module.exports = nextConfig;
