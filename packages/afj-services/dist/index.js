var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var afj_services_exports = {};
__export(afj_services_exports, {
  AgentConfigServices: () => agentConfigs_exports,
  AgentService: () => AgentService,
  ConnectionService: () => ConnectionService,
  CredentialService: () => CredentialService,
  LedgerServices: () => ledgerServices_exports
});
module.exports = __toCommonJS(afj_services_exports);

// src/ledgerServices.ts
var ledgerServices_exports = {};
__export(ledgerServices_exports, {
  fetchGenesisTransaction: () => fetchGenesisTransaction
});
var fetch = (url, init) => import("node-fetch").then(({ default: fetch2 }) => fetch2(url, init));
async function fetchGenesisTransaction(ledgerUrl) {
  console.log(
    "[ledger.services] Fetching Genesis Transaction for Indy Ledger.."
  );
  const res = await fetch(ledgerUrl);
  return await res.text();
}

// src/agentConfigs.ts
var agentConfigs_exports = {};
__export(agentConfigs_exports, {
  createAgent: () => createAgent,
  createAgentConfig: () => createAgentConfig
});
var import_core = require("@aries-framework/core");
var import_node = require("@aries-framework/node");
async function createAgentConfig({ ...args }) {
  console.log("[agent.config] Creating Agent Config..");
  const config = {
    ...args
  };
  return config;
}
var genesisTransactionsCache = /* @__PURE__ */ new WeakMap();
async function createAgent({ config, indyLedgers }) {
  console.log("[agent.config] Creating Agent..");
  let ledgers = [];
  for (const key in indyLedgers) {
    const indyLedger = indyLedgers[key];
    if (genesisTransactionsCache.has(indyLedger)) {
      console.log("[agent.configs] Found Genesis Transaction in cache.");
      if ("ledgerUrl" in indyLedger)
        delete indyLedger.ledgerUrl;
      ledgers.push({
        ...indyLedger,
        genesisTransactions: genesisTransactionsCache.get(indyLedger)
      });
      break;
    }
    const genesisTransactions = await fetchGenesisTransaction(
      indyLedger.ledgerUrl
    );
    if (typeof genesisTransactions !== "string") {
      console.log("[agent.configs] Failed fetching genesis transactions file.");
      break;
    }
    genesisTransactionsCache.set(indyLedger, genesisTransactions);
    delete indyLedger.ledgerUrl;
    ledgers.push({
      ...indyLedger,
      genesisTransactions
    });
  }
  const agent = new import_core.Agent({
    config: {
      ...config,
      indyLedgers: ledgers.map((ledger) => ({
        ...ledger
      }))
    },
    dependencies: import_node.agentDependencies,
    modules: {}
  });
  return agent;
}

// src/baseService.ts
var ServiceWithAgent = class {
  agent;
  constructor(agent) {
    this.agent = agent;
  }
};

// src/agentServices.ts
var AgentService = class extends ServiceWithAgent {
  async config() {
  }
  async issueCredential() {
  }
  async requestCredentialProof() {
  }
};

// src/credentialServices.ts
var import_core2 = require("@aries-framework/core");
var CredentialService = class extends ServiceWithAgent {
  async allCredentials() {
    const creds = await this.agent.credentials.getAll();
    return creds;
  }
  async credentialByConnection(connectionOrId) {
    let connectionRecord;
    if (typeof connectionOrId === "string") {
      connectionRecord = await this.agent.connections.findById(connectionOrId);
    } else {
      connectionRecord = connectionOrId;
    }
    const creds = await this.agent.credentials.getAll();
    return creds;
  }
};

// src/connectionServices.ts
var ConnectionService = class extends ServiceWithAgent {
  async createInvitation(domainUrl) {
    const outOfBandRecord = await this.agent.oob.createInvitation();
    const invitationUrl = outOfBandRecord.outOfBandInvitation.toUrl({
      domain: domainUrl
    });
    return {
      outOfBandRecord,
      invitationUrl
    };
  }
  async receiveInvitation(invitationUrl) {
    const { connectionRecord } = await this.agent.oob.receiveInvitationFromUrl(
      invitationUrl
    );
    return connectionRecord;
  }
  async accpetInvitation(invitationUrl) {
    const { outOfBandRecord } = await this.agent.oob.receiveInvitationFromUrl(
      invitationUrl
    );
    const { connectionRecord } = await this.agent.oob.acceptInvitation(
      outOfBandRecord.id,
      {}
    );
    return connectionRecord;
  }
  async allConnections(filter) {
    const connectionRecords = await this.agent.connections.getAll();
    if (filter) {
      return connectionRecords.filter((connectionRecord) => {
        for (const key in filter) {
          if (filter[key] === void 0 || filter[key] !== connectionRecord[key])
            return false;
        }
        return true;
      });
    }
    return connectionRecords;
  }
  async connectionById(connectionId, filter) {
    const connectionRecord = await this.agent.connections.findById(connectionId);
    return connectionRecord;
  }
  async removeConnection(connectionOrId) {
    let connectionRecord;
    if (typeof connectionOrId === "string") {
      connectionRecord = await this.agent.connections.findById(
        connectionOrId
      );
      if (connectionRecord === null) {
        console.log(
          `[connection.services] Connection record couldn't be found with id '${connectionOrId}'`
        );
        return false;
      }
    } else {
      connectionRecord = connectionOrId;
    }
    await this.agent.connections.deleteById(
      connectionRecord.id
    );
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgentConfigServices,
  AgentService,
  ConnectionService,
  CredentialService,
  LedgerServices
});
//# sourceMappingURL=index.js.map