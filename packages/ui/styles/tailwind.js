const radixColors = require("@radix-ui/colors");

function radixToTailwind(name) {
	return {
		[`radix-${name}`]: Object.fromEntries(
			Object.entries(radixColors[name]).map(([key, value]) => [
				key.slice(name.length),
				value,
			])
		),
	};
}

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		`app/**/*.{js,ts,jsx,tsx}`,
		`src/**/*.{js,ts,jsx,tsx}`,
		`../../packages/**/*.{js,ts,jsx,tsx}`,
	],
	theme: {
		extend: {
			animation: {
				"spin-fast": "spin 0.5s linear infinite",
			},
			colors: {
				...radixToTailwind("red"),
				...radixToTailwind("blue"),
				...radixToTailwind("green"),
				...radixToTailwind("indigo"),
				...radixToTailwind("plum"),
				...radixToTailwind("cyan"),
				gray: {
					100: "#eeeeee",
					200: "#e0e0e0",
					300: "#bbbbbb",
					400: "#666666",
					500: "#444444",
					650: "#333",
					600: "#2a2a2a",
					700: "#1f1f1f",
					800: "#181818",
					900: "#0f0f0f",
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/typography"),
	],
};
