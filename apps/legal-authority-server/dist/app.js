var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/dotenv/package.json
var require_package = __commonJS({
  "../../node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// ../../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// ../../packages/server-lib/dist/index.js
var require_dist = __commonJS({
  "../../packages/server-lib/dist/index.js"(exports, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var server_lib_exports = {};
    __export(server_lib_exports, {
      GraphQLObjects: () => schemaObjects_exports,
      GraphQLUtils: () => graphqlUtils_exports
    });
    module2.exports = __toCommonJS(server_lib_exports);
    var graphqlUtils_exports = {};
    __export(graphqlUtils_exports, {
      writeSchema: () => writeSchema
    });
    var import_node_path = __toESM2(require("path"));
    var import_node_fs = require("fs");
    var import_graphql2 = require("graphql");
    function writeSchema(schema2, pathTo) {
      const schemaAsString = (0, import_graphql2.printSchema)((0, import_graphql2.lexicographicSortSchema)(schema2));
      const schemaPath = import_node_path.default.join(process.cwd(), pathTo);
      const existingSchema = (0, import_node_fs.existsSync)(schemaPath) && (0, import_node_fs.readFileSync)(schemaPath, "utf-8");
      if (existingSchema !== schemaAsString) {
        (0, import_node_fs.writeFileSync)(schemaPath, schemaAsString);
      }
    }
    var schemaObjects_exports = {};
  }
});

// src/app.ts
var import_dotenv = __toESM(require_main());

// src/server.ts
var import_express = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));
var import_core4 = require("@aries-framework/core");
var import_node2 = require("@aries-framework/node");
var import_ws = require("ws");
var import_ws2 = require("graphql-ws/lib/use/ws");
var import_afj_services3 = require("@dbin/afj-services");
var import_graphql_yoga2 = require("graphql-yoga");

// src/graphql/index.ts
var import_server_lib = __toESM(require_dist());

// src/graphql/builder.ts
var import_core = __toESM(require("@pothos/core"));
var import_plugin_scope_auth = __toESM(require("@pothos/plugin-scope-auth"));
var import_plugin_validation = __toESM(require("@pothos/plugin-validation"));
var import_plugin_smart_subscriptions = __toESM(require("@pothos/plugin-smart-subscriptions"));

// src/utils/pubsub.ts
var import_graphql_yoga = require("graphql-yoga");
var pubsub = (0, import_graphql_yoga.createPubSub)();

// src/graphql/builder.ts
var builder = new import_core.default({
  defaultInputFieldRequiredness: true,
  plugins: [import_plugin_scope_auth.default, import_plugin_validation.default, import_plugin_smart_subscriptions.default],
  authScopes: ({ agent: agent2 }) => ({
    withAgent: !!agent2
  }),
  smartSubscriptions: {
    ...(0, import_plugin_smart_subscriptions.subscribeOptionsFromIterator)((name, ctx) => {
      return pubsub.subscribe(name);
    })
  }
});
builder.queryType({
  authScopes: {
    withAgent: true
  }
});
builder.mutationType({
  authScopes: {
    withAgent: true
  }
});
builder.subscriptionType({
  authScopes: {
    withAgent: true
  }
});
builder.scalarType("DateTime", {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    if (typeof date !== "string") {
      throw new Error("Invalid date");
    }
    return new Date(date);
  }
});

// src/graphql/resolvers/agentResolver.ts
var AgentObjectRef = builder.objectRef("Agent");
AgentObjectRef.implement({
  fields: (t) => ({
    label: t.string({ resolve: (parent) => parent.config.label }),
    isInitialized: t.exposeBoolean("isInitialized")
  })
});
builder.queryField(
  "agent",
  (t) => t.field({
    type: AgentObjectRef,
    resolve: async (_root, _args, { agent: agent2 }) => {
      return agent2;
    }
  })
);

// src/graphql/resolvers/connectionResolver.ts
var import_core2 = require("@aries-framework/core");
var import_afj_services = require("@dbin/afj-services");

// src/subscriptions/connectionsTopics.ts
var CONNECTION_REQUEST = "connection_request";
var CONNECTION_ACCEPTED = "connection_accepted";
var CONNECTION_REJECTED = "connection_rejected";
var CONNECTION_CLOSED = "connection_closed";
var CONNECTION_TOPICS = [
  CONNECTION_REQUEST,
  CONNECTION_ACCEPTED,
  CONNECTION_REJECTED,
  CONNECTION_CLOSED
];

// src/graphql/resolvers/connectionResolver.ts
var ConnectionObjectRef = builder.objectRef("Connection");
function connectionStateToReadable(state) {
  switch (state) {
    case import_core2.DidExchangeState.Completed:
      return "Connection Established";
    case import_core2.DidExchangeState.RequestReceived:
      return "Connection Processing";
    case import_core2.DidExchangeState.RequestSent:
      return "Connection Processing";
    default:
      return "Unknown";
  }
}
function getConnectionProtocolVersion(protocol) {
  if (!protocol)
    return null;
  return protocol.endsWith("/1.0") ? "v1" : protocol.endsWith("/2.0") ? "v2" : null;
}
ConnectionObjectRef.implement({
  fields: (t) => ({
    id: t.exposeString("id", {
      description: "Connection Record ID, often known as connectionId"
    }),
    type: t.exposeString("type"),
    rawState: t.exposeString("state"),
    state: t.string({
      resolve: (connection) => connectionStateToReadable(connection.state)
    }),
    role: t.exposeString("role"),
    did: t.exposeString("did", { nullable: true }),
    alias: t.exposeString("alias", { nullable: true }),
    protocol: t.exposeString("protocol", { nullable: true }),
    protocolVersion: t.string({
      nullable: true,
      resolve: (connection) => getConnectionProtocolVersion(connection.protocol)
    }),
    theirDid: t.exposeString("theirDid", { nullable: true }),
    theirLabel: t.exposeString("theirLabel", {
      nullable: true
    }),
    threadId: t.exposeString("threadId", { nullable: true }),
    mediatorId: t.exposeString("mediatorId", {
      nullable: true
    }),
    oobId: t.exposeString("outOfBandId", { nullable: true }),
    invitationDid: t.exposeString("invitationDid", {
      nullable: true
    }),
    errMessage: t.exposeString("errorMessage", {
      nullable: true
    }),
    autoAcceptConnection: t.exposeBoolean("autoAcceptConnection", {
      nullable: true
    }),
    isReady: t.boolean({
      resolve: (parent) => parent.isReady
    }),
    isRequester: t.boolean({
      resolve: (parent) => parent.isRequester
    })
  })
});
var ConnectionsFilterInput = builder.inputType("ConnectionsFilterInput", {
  fields: (t) => ({
    state: t.string({ required: false }),
    theirDid: t.string({ required: false }),
    theirLabel: t.string({ required: false }),
    protocol: t.string({ required: false }),
    isReady: t.boolean({ required: false }),
    isRequester: t.boolean({ required: false })
  })
});
builder.queryField(
  "connections",
  (t) => t.field({
    type: [ConnectionObjectRef],
    smartSubscription: true,
    subscribe: (subscriptions, _, {}, ctx) => {
      CONNECTION_TOPICS.forEach((topic) => subscriptions.register(topic));
    },
    args: {
      filter: t.arg({
        type: ConnectionsFilterInput,
        required: false
      })
    },
    resolve: async (_root, { filter }, { agent: agent2 }) => {
      const connectionServices = new import_afj_services.ConnectionService(agent2);
      return await connectionServices.allConnections({
        ...filter
      });
    }
  })
);
builder.queryField(
  "connection",
  (t) => t.field({
    type: ConnectionObjectRef,
    args: {
      id: t.arg.string()
    },
    resolve: async (_root, { id }, { agent: agent2 }) => {
      const connectionService = new import_afj_services.ConnectionService(agent2);
      const connection = await connectionService.connectionById(id);
      return connection;
    }
  })
);
builder.mutationField(
  "createInvitation",
  (t) => t.field({
    type: "String",
    resolve: async (_root, _args, { agent: agent2 }) => {
      const connectionServices = new import_afj_services.ConnectionService(agent2);
      const { invitationUrl, outOfBandRecord } = await connectionServices.createInvitation(
        "http://localhost:8000/invitation"
      );
      return invitationUrl;
    }
  })
);
var RemoveConnectionInput = builder.inputType("RemoveConnectionInput", {
  fields: (t) => ({
    connectionId: t.string()
  })
});
builder.mutationField(
  "removeConnection",
  (t) => t.field({
    type: "Boolean",
    args: {
      input: t.arg({ type: RemoveConnectionInput })
    },
    resolve: async (_root, { input }, { agent: agent2 }) => {
      const connectionServices = new import_afj_services.ConnectionService(agent2);
      return await connectionServices.removeConnection(input.connectionId);
    }
  })
);

// src/graphql/resolvers/credentialResolver.ts
var import_afj_services2 = require("@dbin/afj-services");
var CredentialObjectRef = builder.objectRef("Credential");
CredentialObjectRef.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    threadId: t.exposeString("threadId"),
    state: t.exposeString("state"),
    protocolVersion: t.exposeString("protocolVersion"),
    type: t.exposeString("type"),
    connectionId: t.exposeString("connectionId", {
      nullable: true
    })
  })
});
builder.queryField(
  "credentials",
  (t) => t.field({
    type: [CredentialObjectRef],
    args: {},
    resolve: async (_root, {}, { agent: agent2 }) => {
      const credentialService = new import_afj_services2.CredentialService(agent2);
      const credentials = await credentialService.allCredentials();
      return credentials;
    }
  })
);
builder.queryField(
  "credentialByConnection",
  (t) => t.field({
    type: [CredentialObjectRef],
    args: {
      connectionId: t.arg.string({ required: true })
    },
    resolve: async (_root, {}, { agent: agent2 }) => {
      throw new Error("Not implemented yet.");
    }
  })
);

// src/utils/wallet.ts
var import_core3 = require("@aries-framework/core");
var import_node = require("@aries-framework/node");
var import_node_crypto = require("crypto");
async function createSeed(agent2) {
  const seed = (0, import_node_crypto.randomBytes)(16).toString("hex");
  const wallet = agent2.dependencyManager.resolve(
    import_core3.InjectionSymbols.Wallet
  );
  const [did, verkey] = await import_node.agentDependencies.indy.createAndStoreMyDid(
    wallet.handle,
    {
      seed
    }
  );
  return {
    seed,
    did,
    verkey
  };
}

// src/graphql/resolvers/didResolver.ts
var DidObjectRef = builder.objectRef("Did");
DidObjectRef.implement({
  fields: (t) => ({
    did: t.exposeString("did"),
    verkey: t.exposeString("verkey")
  })
});
builder.mutationField(
  "createDid",
  (t) => t.field({
    type: DidObjectRef,
    deprecationReason: "Not compatible with afj-0.3.x version",
    resolve: async (_root, _args, { agent: agent2 }) => {
      const didAndSeed = await createSeed(agent2);
      console.log(
        "secret seed: ",
        didAndSeed.seed,
        "\n for did: ",
        didAndSeed.did
      );
      return didAndSeed;
    }
  })
);

// src/graphql/index.ts
var IS_PRODUCTION = process.env.NODE_ENV === "production";
var schema = builder.toSchema({});
if (!IS_PRODUCTION) {
  import_server_lib.GraphQLUtils.writeSchema(schema, "schema.graphql");
}

// src/server.ts
var agent;
function getAgent() {
  if (!agent)
    return null;
  return agent;
}
function createGraphQLContext(request) {
  return {
    req: request,
    agent: getAgent()
  };
}
async function initServer(port2) {
  const app = (0, import_express.default)();
  app.use((0, import_morgan.default)(":date[iso] :method :url :response-time"));
  const agentConfig = await import_afj_services3.AgentConfigServices.createAgentConfig({
    label: "@dbin/legal-authority-agent",
    walletConfig: {
      id: "@dbin/legal-authority-wallet",
      key: "demoagentlegalauthority0000000000000000000"
    },
    endpoints: [`http://localhost:${String(port2)}`],
    logger: new import_core4.ConsoleLogger(import_core4.LogLevel.debug),
    publicDidSeed: process.env.BCOVRIN_TEST_PUBLIC_DID_SEED
  });
  agent = await import_afj_services3.AgentConfigServices.createAgent({
    config: agentConfig,
    indyLedgers: [
      {
        id: "pool-bcovrin-greenlight-cloud-agent",
        indyNamespace: "bcovrin:test",
        ledgerUrl: "http://greenlight.bcovrin.vonx.io/genesis",
        isProduction: false
      }
    ]
  });
  agent.registerOutboundTransport(new import_core4.HttpOutboundTransport());
  const inboundTransporter = new import_node2.HttpInboundTransport({
    port: port2,
    app
  });
  agent.registerInboundTransport(inboundTransporter);
  const yoga = (0, import_graphql_yoga2.createYoga)({
    schema,
    graphqlEndpoint: "/api/graphql",
    graphiql: {
      subscriptionsProtocol: "WS"
    },
    landingPage: false,
    context: ({ request }) => createGraphQLContext(request)
  });
  app.use("/api/graphql", yoga);
  await agent.initialize();
  const server = inboundTransporter.server;
  const wsServer = new import_ws.Server({
    server,
    path: yoga.graphqlEndpoint
  });
  (0, import_ws2.useServer)(
    {
      execute: (args) => args.execute(args),
      subscribe: (args) => args.subscribe(args),
      context: {
        aegnt: getAgent()
      },
      onSubscribe: async (ctx, msg) => {
        const { schema: schema2, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        });
        const args = {
          schema: schema2,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          execute,
          subscribe
        };
        const errors = validate(args.schema, args.document);
        if (errors.length)
          return errors;
        return args;
      }
    },
    wsServer
  );
  await registerAgentConnectionListener(agent);
  console.log(`[server-log]: server running on ${port2}`);
}
async function registerAgentConnectionListener(agent2) {
  agent2.events.on(
    import_core4.ConnectionEventTypes.ConnectionStateChanged,
    ({ payload, metadata, type }) => {
      console.log(
        "[event-listener]: New Connection Response for '@dbin/legal-authority-server' agent."
      );
      console.log(
        `[event-listener]: ConnectionRecord & State: ${payload.connectionRecord.id} ++ ${payload.connectionRecord.state} , previousState: ${payload.previousState}`
      );
      switch (payload.connectionRecord.state) {
        case import_core4.DidExchangeState.Completed:
          pubsub.publish(CONNECTION_ACCEPTED);
          break;
        case import_core4.DidExchangeState.RequestSent:
          pubsub.publish(CONNECTION_REQUEST);
          break;
        default:
          break;
      }
    }
  );
}

// src/app.ts
import_dotenv.default.config();
var port = Number(process.env.PORT) || 8e3;
initServer(port);
