/**
 * @generated SignedSource<<98dd5ff0b59959450658bccf6988fff0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ConnectionsViewQuery$variables = {};
export type ConnectionsViewQuery$data = {
  readonly connections: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type ConnectionsViewQuery = {
  response: ConnectionsViewQuery$data;
  variables: ConnectionsViewQuery$variables;
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionsViewQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConnectionsViewQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "69ada06eb684ca2b627a17e7f7040cdd",
    "id": null,
    "metadata": {},
    "name": "ConnectionsViewQuery",
    "operationKind": "query",
    "text": "query ConnectionsViewQuery {\n  connections {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "46efa294218ad1765fc56fb93d83d7c1";

export default node;
