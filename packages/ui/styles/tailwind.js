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

module.exports = function (app, options) {
	/** @type {import('tailwindcss').Config} */
	const tailwindConfig = {
		darkMode: "media",
		content: [
			!options?.ignorePackages && "../../packages/*/src/**/*.{ts,tsx,html}",
			app
				? `../../apps/${app}/src/**/*.{ts,tsx,html}`
				: `./src/**/*.{ts,tsx,html}`,
		],
		theme: {
			extend: {
				colors: {
					...radixToTailwind("blue"),
					...radixToTailwind("gray"),
					...radixToTailwind("purple"),
					...radixToTailwind("red"),
					...radixToTailwind("yellow"),
					...radixToTailwind("teal"),
					...radixToTailwind("indigo"),
					...radixToTailwind("violet"),
					...radixToTailwind("crimson"),
					...radixToTailwind("plum"),
					...radixToTailwind("lime"),
					...radixToTailwind("cyan"),
					...radixToTailwind("mint"),
					...radixToTailwind("sky"),
					...radixToTailwind("tomato"),
					...radixToTailwind("pink"),
					...radixToTailwind("green"),
					...radixToTailwind("grass"),
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
					neutral: {
						50: "rgb(246,248,250)",
						100: "rgb(235,238,241)",
						200: "rgb(192,200,210)",
						300: "rgb(163,172,186)",
						400: "rgb(135,145,159)",
						500: "rgb(106,115,131)",
						600: "rgb(84,90,105)",
						700: "rgb(64,68,82)",
						800: "rgb(48,49,61)",
						900: "rgb(26,27,37)",
					},
				},
			},
		},
		plugins: [
			require("@tailwindcss/aspect-ratio"),
			require("@tailwindcss/typography"),
			require("@tailwindcss/forms"),
		],
	};

	return tailwindConfig;
};
