/**
 * @generated SignedSource<<2f5c53220abda4ad7f15bf3278fe95b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type authRoutesMeQuery$variables = {};
export type authRoutesMeQuery$data = {
  readonly me: boolean;
};
export type authRoutesMeQuery = {
  response: authRoutesMeQuery$data;
  variables: authRoutesMeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "me",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "authRoutesMeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authRoutesMeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e910c081e62e95035bcb5d790623657f",
    "id": null,
    "metadata": {},
    "name": "authRoutesMeQuery",
    "operationKind": "query",
    "text": "query authRoutesMeQuery {\n  me\n}\n"
  }
};
})();

(node as any).hash = "3b40f8976a8b609079c9357b000c8848";

export default node;
