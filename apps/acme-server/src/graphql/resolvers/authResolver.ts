import { AuthUtils, SessionUtils } from "@dbin/server-lib";
import { addSeconds } from "date-fns";
import { db } from "../../utils/prisma";
import { builder } from "../builder";

const SignInInput = builder.inputType("SignInInput", {
	fields: (t) => ({
		email: t.string(),
		password: t.string(),
	}),
});

builder.mutationField("signIn", (t) =>
	t.field({
		type: "Boolean",
		skipTypeScopes: true,
		args: {
			input: t.arg({ type: SignInInput }),
		},
		resolve: async (_root, { input }, { req }) => {
			const user = await db.user.findUnique({
				where: { email: input.email },
			});

			if (!user) {
				throw new Error(`User with ${input.email} E-Mail not found`);
			}

			const isValid = await AuthUtils.verifyPassword({
				hashedPassword: user.password,
				password: input.password,
			});

			if (isValid) {
				const session = await db.session.create({
					data: {
						userId: user.id,
						expiresAt: addSeconds(new Date(), SessionUtils.SESSION_TTL),
					},
				});
				if (!session) {
					throw new Error("Internal Server Error");
				}

				req.session.sessionId = session.id;
				await req.session.save();

				return true;
			}

			req.session.destroy();
			return false;
		},
	})
);

builder.queryField("me", (t) =>
	t.field({
		type: "Boolean",
		resolve: async (_root, _args, { user }) => {
			if (!user) {
				return false;
			}

			const userRecord = await db.user.findUnique({
				where: { id: user },
			});

			return !!userRecord;
		},
	})
);
