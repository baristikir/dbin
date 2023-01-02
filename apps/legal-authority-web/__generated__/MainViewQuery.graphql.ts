/**
 * @generated SignedSource<<69d2b276d7ab03a5b6b30b092bb75eea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MainViewQuery$variables = {};
export type MainViewQuery$data = {
  readonly agent: {
    readonly isInitialized: boolean;
    readonly label: string;
  };
  readonly connections: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type MainViewQuery = {
  response: MainViewQuery$data;
  variables: MainViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Connection",
    "kind": "LinkedField",
    "name": "connections",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Agent",
    "kind": "LinkedField",
    "name": "agent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isInitialized",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainViewQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainViewQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5f76f721406740845ad810c6fad10d05",
    "id": null,
    "metadata": {},
    "name": "MainViewQuery",
    "operationKind": "query",
    "text": "query MainViewQuery {\n  connections {\n    id\n  }\n  agent {\n    label\n    isInitialized\n  }\n}\n"
  }
};
})();

(node as any).hash = "7160ac9dcb28372a1cf5832d08dc38e8";

export default node;
