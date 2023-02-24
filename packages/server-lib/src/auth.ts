import crypto from "crypto";
import { bcrypt, bcryptVerify } from "hash-wasm";

const COST_FACTOR = 11;

interface VerifyPasswordProps {
	password: string;
	hashedPassword: string;
}
export async function verifyPassword({
	password,
	hashedPassword,
}: VerifyPasswordProps) {
	return await bcryptVerify({
		hash: hashedPassword,
		password: password,
	});
}

interface HashPasswordProps {
	password: string;
}
export async function hashPassword({ password }: HashPasswordProps) {
	const salt = crypto.randomBytes(16);

	const hash = await bcrypt({
		password,
		salt,
		costFactor: COST_FACTOR,
		outputType: "encoded",
	});

	return hash;
}
