"use strict";
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
var server_lib_exports = {};
__export(server_lib_exports, {
  AuthUtils: () => auth_exports,
  GraphQLObjects: () => schemaObjects_exports,
  GraphQLUtils: () => graphqlUtils_exports,
  SessionUtils: () => sessions_exports
});
module.exports = __toCommonJS(server_lib_exports);

// src/graphqlUtils.ts
var graphqlUtils_exports = {};
__export(graphqlUtils_exports, {
  writeSchema: () => writeSchema
});
var import_node_path = __toESM(require("path"));
var import_node_fs = require("fs");
var import_graphql = require("graphql");
function writeSchema(schema, pathTo) {
  const schemaAsString = (0, import_graphql.printSchema)((0, import_graphql.lexicographicSortSchema)(schema));
  const schemaPath = import_node_path.default.join(process.cwd(), pathTo);
  const existingSchema = (0, import_node_fs.existsSync)(schemaPath) && (0, import_node_fs.readFileSync)(schemaPath, "utf-8");
  if (existingSchema !== schemaAsString) {
    (0, import_node_fs.writeFileSync)(schemaPath, schemaAsString);
  }
}

// src/schemaObjects.ts
var schemaObjects_exports = {};

// src/auth.ts
var auth_exports = {};
__export(auth_exports, {
  hashPassword: () => hashPassword,
  verifyPassword: () => verifyPassword
});
var import_crypto = __toESM(require("crypto"));
var import_hash_wasm = require("hash-wasm");
var COST_FACTOR = 11;
async function verifyPassword({
  password,
  hashedPassword
}) {
  return await (0, import_hash_wasm.bcryptVerify)({
    hash: hashedPassword,
    password
  });
}
async function hashPassword({ password }) {
  const salt = import_crypto.default.randomBytes(16);
  const hash = await (0, import_hash_wasm.bcrypt)({
    password,
    salt,
    costFactor: COST_FACTOR,
    outputType: "encoded"
  });
  return hash;
}

// src/sessions.ts
var sessions_exports = {};
__export(sessions_exports, {
  SESSION_TTL: () => SESSION_TTL,
  createIronSession: () => createIronSession,
  createSession: () => createSession,
  deleteSession: () => deleteSession,
  resolveSession: () => resolveSession
});
var import_express = require("iron-session/express");
var SESSION_TTL = 15 * 24 * 3600;
var createIronSession = ({ ...props }) => {
  return (0, import_express.ironSession)({
    ttl: SESSION_TTL,
    cookieOptions: {
      httpOnly: true,
      ...props.cookieOptions
    },
    ...props
  });
};
function resolveSession({}) {
}
function createSession({}) {
}
function deleteSession({}) {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUtils,
  GraphQLObjects,
  GraphQLUtils,
  SessionUtils
});
