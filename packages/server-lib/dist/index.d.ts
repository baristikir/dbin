import { GraphQLSchema } from 'graphql';
import { DidInfo, Agent, ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core';
import { Schema, CredDef } from 'indy-sdk';
import * as express from 'express';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import { IronSessionOptions } from 'iron-session';

declare function writeSchema(schema: GraphQLSchema, pathTo: string): void;

declare const graphqlUtils_writeSchema: typeof writeSchema;
declare namespace graphqlUtils {
  export {
    graphqlUtils_writeSchema as writeSchema,
  };
}

interface DidObjectType extends DidInfo {
}
interface AgentObjectType extends Agent {
}
interface ConnectionObjectType extends ConnectionRecord {
}
interface CredentialObjectType extends CredentialExchangeRecord {
}
interface CredentialSchemaObjectType extends Schema {
}
interface CredentialDefinitionObjectType extends CredDef {
}

type schemaObjects_DidObjectType = DidObjectType;
type schemaObjects_AgentObjectType = AgentObjectType;
type schemaObjects_ConnectionObjectType = ConnectionObjectType;
type schemaObjects_CredentialObjectType = CredentialObjectType;
type schemaObjects_CredentialSchemaObjectType = CredentialSchemaObjectType;
type schemaObjects_CredentialDefinitionObjectType = CredentialDefinitionObjectType;
declare namespace schemaObjects {
  export {
    schemaObjects_DidObjectType as DidObjectType,
    schemaObjects_AgentObjectType as AgentObjectType,
    schemaObjects_ConnectionObjectType as ConnectionObjectType,
    schemaObjects_CredentialObjectType as CredentialObjectType,
    schemaObjects_CredentialSchemaObjectType as CredentialSchemaObjectType,
    schemaObjects_CredentialDefinitionObjectType as CredentialDefinitionObjectType,
  };
}

interface VerifyPasswordProps {
    password: string;
    hashedPassword: string;
}
declare function verifyPassword({ password, hashedPassword, }: VerifyPasswordProps): Promise<boolean>;
interface HashPasswordProps {
    password: string;
}
declare function hashPassword({ password }: HashPasswordProps): Promise<string>;

declare const auth_verifyPassword: typeof verifyPassword;
declare const auth_hashPassword: typeof hashPassword;
declare namespace auth {
  export {
    auth_verifyPassword as verifyPassword,
    auth_hashPassword as hashPassword,
  };
}

declare const SESSION_TTL: number;
interface IronSessionProps extends IronSessionOptions {
}
declare const createIronSession: ({ ...props }: IronSessionProps) => (req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>, next: express.NextFunction) => Promise<void>;
interface ResolveSessionProps {
}
declare function resolveSession({}: ResolveSessionProps): void;
interface CreateSessionProps {
}
declare function createSession({}: CreateSessionProps): void;
interface DeleteSessionProps {
}
declare function deleteSession({}: DeleteSessionProps): void;

declare const sessions_SESSION_TTL: typeof SESSION_TTL;
declare const sessions_createIronSession: typeof createIronSession;
declare const sessions_resolveSession: typeof resolveSession;
declare const sessions_createSession: typeof createSession;
declare const sessions_deleteSession: typeof deleteSession;
declare namespace sessions {
  export {
    sessions_SESSION_TTL as SESSION_TTL,
    sessions_createIronSession as createIronSession,
    sessions_resolveSession as resolveSession,
    sessions_createSession as createSession,
    sessions_deleteSession as deleteSession,
  };
}

export { auth as AuthUtils, schemaObjects as GraphQLObjects, graphqlUtils as GraphQLUtils, sessions as SessionUtils };
