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

// src/app.ts
var import_dotenv = __toESM(require_main());

// src/server.ts
var import_express = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));
var import_core3 = require("@aries-framework/core");
var import_node = require("@aries-framework/node");
var import_afj_services2 = require("@dbin/afj-services");
var import_graphql_yoga = require("graphql-yoga");

// src/graphql/index.ts
var import_server_lib = require("@dbin/server-lib");

// src/graphql/builder.ts
var import_core = __toESM(require("@pothos/core"));
var import_plugin_scope_auth = __toESM(require("@pothos/plugin-scope-auth"));
var import_plugin_validation = __toESM(require("@pothos/plugin-validation"));
var builder = new import_core.default({
  defaultInputFieldRequiredness: true,
  plugins: [import_plugin_scope_auth.default, import_plugin_validation.default],
  authScopes: ({ agent: agent2 }) => ({
    withAgent: !!agent2
  })
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
    state: t.string({
      resolve: (connection) => connectionStateToReadable(connection.state)
    }),
    isStateCompleted: t.boolean({
      resolve: (connection) => connection.state === import_core2.DidExchangeState.Completed
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
builder.queryField(
  "connections",
  (t) => t.field({
    type: [ConnectionObjectRef],
    resolve: async (_root, _args, { agent: agent2 }) => {
      const connectionService = new import_afj_services.ConnectionService(agent2);
      const connections = await connectionService.allConnections();
      return connections;
    }
  })
);
var ConnectWithAgentInput = builder.inputType("ConnectWithAgentInput", {
  fields: (t) => ({
    url: t.string()
  })
});
builder.mutationField(
  "acceptInvitation",
  (t) => t.field({
    type: "Boolean",
    args: {
      input: t.arg({
        type: ConnectWithAgentInput
      })
    },
    resolve: async (_root, { input }, { agent: agent2 }) => {
      const connectionService = new import_afj_services.ConnectionService(agent2);
      const connectionRecord = await connectionService.receiveInvitation(
        input.url
      );
      return connectionRecord ? true : false;
    }
  })
);
var RemoveConnectionInput = builder.inputType("RemoveConnectionInput", {
  fields: (t) => ({
    id: t.string()
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
      const connectionService = new import_afj_services.ConnectionService(agent2);
      return await connectionService.removeConnection(input.id);
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
function resolveEndpointsByEnvironment({
  port: port2,
  publicIpOrDomain
}) {
  return process.env.NODE_ENV === "production" ? publicIpOrDomain ? [`${publicIpOrDomain}:${port2}`] : [] : [`http://localhost:${port2}`];
}
async function initServer(port2) {
  const app = (0, import_express.default)();
  app.use((0, import_morgan.default)(":date[iso] :method :url :response-time"));
  const agentConfig = await import_afj_services2.AgentConfigServices.createAgentConfig({
    label: "@dbin/acme-agent",
    walletConfig: {
      id: "@dbin/acme-wallet",
      key: process.env.WALLET_CONFIG_KEY ?? "testdemoagentforacme00000000"
    },
    endpoints: resolveEndpointsByEnvironment({
      port: port2,
      publicIpOrDomain: process.env.PUBLIC_IP_ADRESS
    }),
    logger: new import_core3.ConsoleLogger(import_core3.LogLevel.debug)
  });
  agent = await import_afj_services2.AgentConfigServices.createAgent({
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
  agent.registerOutboundTransport(new import_core3.HttpOutboundTransport());
  const inboundTransporter = new import_node.HttpInboundTransport({
    port: port2,
    app
  });
  agent.registerInboundTransport(inboundTransporter);
  const yoga = (0, import_graphql_yoga.createYoga)({
    schema,
    graphqlEndpoint: "/api/graphql",
    graphiql: true,
    landingPage: false,
    context: ({ request }) => createGraphQLContext(request)
  });
  app.use("/api/graphql", yoga);
  await agent.initialize();
  console.log(`[server-log]: server running on ${port2}`);
}

// src/app.ts
import_dotenv.default.config();
var port = Number(process.env.PORT) || 8001;
initServer(port);
