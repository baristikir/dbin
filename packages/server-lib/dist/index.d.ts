import { GraphQLSchema } from 'graphql';
import { DidInfo, Agent, ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core';
import { Schema } from 'indy-sdk';

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

type schemaObjects_DidObjectType = DidObjectType;
type schemaObjects_AgentObjectType = AgentObjectType;
type schemaObjects_ConnectionObjectType = ConnectionObjectType;
type schemaObjects_CredentialObjectType = CredentialObjectType;
type schemaObjects_CredentialSchemaObjectType = CredentialSchemaObjectType;
declare namespace schemaObjects {
  export {
    schemaObjects_DidObjectType as DidObjectType,
    schemaObjects_AgentObjectType as AgentObjectType,
    schemaObjects_ConnectionObjectType as ConnectionObjectType,
    schemaObjects_CredentialObjectType as CredentialObjectType,
    schemaObjects_CredentialSchemaObjectType as CredentialSchemaObjectType,
  };
}

export { schemaObjects as GraphQLObjects, graphqlUtils as GraphQLUtils };
