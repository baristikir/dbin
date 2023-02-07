import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	displayName: "@dbin/afj-services-tests",
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
};

export default config;
