/**
 * @generated SignedSource<<f8872c5c945c3e883417a6ea8a953aa1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionsViewSubscription$variables = {};
export type ConnectionsViewSubscription$data = {
  readonly connections: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionCard_connection">;
  }>;
};
export type ConnectionsViewSubscription = {
  response: ConnectionsViewSubscription$data;
  variables: ConnectionsViewSubscription$variables;
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
    "name": "ConnectionsViewSubscription",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConnectionsViewSubscription",
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
    "cacheID": "e85334857ded2c2fba81552d28e5f09b",
    "id": null,
    "metadata": {},
    "name": "ConnectionsViewSubscription",
    "operationKind": "subscription",
    "text": "subscription ConnectionsViewSubscription {\n  connections {\n    id\n    ...ConnectionCard_connection\n  }\n}\n\nfragment ConnectionCard_connection on Connection {\n  id\n  theirDid\n  theirLabel\n  state\n  role\n}\n"
  }
};
})();

(node as any).hash = "778faa3298f45f9dcc9beed46aca2c5a";

export default node;
