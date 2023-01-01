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
  GraphQLObjects: () => schemaObjects_exports,
  GraphQLUtils: () => graphqlUtils_exports
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GraphQLObjects,
  GraphQLUtils
});
