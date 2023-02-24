import { PrismaClient } from "@prisma/client";

export let db: PrismaClient;
if (process.env.NODE_ENV === "production") {
	db = new PrismaClient({
		log: ["error", "warn"],
	});
} else {
	db = new PrismaClient({
		log: ["info", "query", "error", "warn"],
	});
}
