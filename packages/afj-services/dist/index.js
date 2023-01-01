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
  AgentServices: () => agentServices_exports,
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
    dependencies: import_node.agentDependencies
  });
  return agent;
}

// src/agentServices.ts
var agentServices_exports = {};
__export(agentServices_exports, {
  AgentServices: () => AgentServices
});
var AgentServices = class {
  agent;
  constructor(agent) {
    this.agent = agent;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgentConfigServices,
  AgentServices,
  LedgerServices
});
//# sourceMappingURL=index.js.map