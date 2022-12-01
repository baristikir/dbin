/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		transpilePackages: ["ui"],
	},
};

module.exports = nextConfig;
