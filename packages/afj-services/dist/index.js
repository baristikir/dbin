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
    const genesisTransactions = `
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"138.197.161.221","client_port":9702,"node_ip":"138.197.161.221","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"138.197.161.221","client_port":9704,"node_ip":"138.197.161.221","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"138.197.161.221","client_port":9706,"node_ip":"138.197.161.221","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"138.197.161.221","client_port":9708,"node_ip":"138.197.161.221","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`;
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
    modules: {
      connections: new import_core.ConnectionsModule({
        autoAcceptConnections: true
      })
    }
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