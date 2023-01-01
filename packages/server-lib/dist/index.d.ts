import { GraphQLSchema } from 'graphql';
import { Agent, ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core';

declare function writeSchema(schema: GraphQLSchema, pathTo: string): void;

declare const graphqlUtils_writeSchema: typeof writeSchema;
declare namespace graphqlUtils {
  export {
    graphqlUtils_writeSchema as writeSchema,
  };
}

interface AgentObjectType extends Agent {
}
interface ConnectionObjectType extends ConnectionRecord {
}
interface CredentialObjectType extends CredentialExchangeRecord {
}

type schemaObjects_AgentObjectType = AgentObjectType;
type schemaObjects_ConnectionObjectType = ConnectionObjectType;
type schemaObjects_CredentialObjectType = CredentialObjectType;
declare namespace schemaObjects {
  export {
    schemaObjects_AgentObjectType as AgentObjectType,
    schemaObjects_ConnectionObjectType as ConnectionObjectType,
    schemaObjects_CredentialObjectType as CredentialObjectType,
  };
}

export { schemaObjects as GraphQLObjects, graphqlUtils as GraphQLUtils };
