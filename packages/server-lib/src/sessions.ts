import { ironSession } from "iron-session/express";
import type { IronSessionOptions } from "iron-session";

export const SESSION_TTL = 15 * 24 * 3600;

interface IronSessionProps extends IronSessionOptions {}
export const createIronSession = ({ ...props }: IronSessionProps) => {
	return ironSession({
		ttl: SESSION_TTL,
		cookieOptions: {
			httpOnly: true,
			// secure: false,
			...props.cookieOptions,
		},
		...props,
	});
};

interface ResolveSessionProps {}
export function resolveSession({}: ResolveSessionProps) {}

interface CreateSessionProps {}
export function createSession({}: CreateSessionProps) {}

interface DeleteSessionProps {}
export function deleteSession({}: DeleteSessionProps) {}
