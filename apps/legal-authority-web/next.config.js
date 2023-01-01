/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		transpilePackages: ["@dbin/ui"],
	},
};

module.exports = nextConfig;
