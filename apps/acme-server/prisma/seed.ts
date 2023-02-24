import { AuthUtils } from "@dbin/server-lib";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Creating business user
	await prisma.user.create({
		data: {
			email: "test@example.com",
			password: await AuthUtils.hashPassword({
				password: "testtest",
			}),
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
