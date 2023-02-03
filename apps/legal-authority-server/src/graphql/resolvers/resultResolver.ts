import { builder } from "../builder";

export enum ResultStatus {
	SUCCESS = "SUCCESS",
	FAILED = "FAILED",
}

builder.enumType(ResultStatus, { name: "ResultStatus" });
export const Result = builder
	.objectRef<{
		status: ResultStatus;
		message: string;
	}>("Result")
	.implement({
		fields: (t) => ({
			status: t.expose("status", { type: ResultStatus }),
			payload: t.exposeString("message"),
		}),
	});
