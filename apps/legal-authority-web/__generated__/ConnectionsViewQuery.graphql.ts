/**
 * @generated SignedSource<<fb4dd69d37ec51ceaae8bf6ab0de89c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionsViewQuery$variables = {};
export type ConnectionsViewQuery$data = {
  readonly connections: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionCard_connection">;
  }>;
};
export type ConnectionsViewQuery = {
  response: ConnectionsViewQuery$data;
  variables: ConnectionsViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Connection",
        "kind": "LinkedField",
        "name": "connections",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConnectionCard_connection"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConnectionsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Connection",
        "kind": "LinkedField",
        "name": "connections",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "theirDid",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "theirLabel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "role",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad3f6aceab20939648756819045f946e",
    "id": null,
    "metadata": {},
    "name": "ConnectionsViewQuery",
    "operationKind": "query",
    "text": "query ConnectionsViewQuery {\n  connections {\n    id\n    ...ConnectionCard_connection\n  }\n}\n\nfragment ConnectionCard_connection on Connection {\n  id\n  theirDid\n  theirLabel\n  state\n  role\n}\n"
  }
};
})();

(node as any).hash = "4c5c9ddcf3c3879ed2eb33002bc5b3a9";

export default node;
