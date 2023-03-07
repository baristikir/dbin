/**
 * @generated SignedSource<<ffc1f6d7e77fe8c239cc114443244bb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeViewConnectionsQuery$variables = {};
export type HomeViewConnectionsQuery$data = {
  readonly agent: {
    readonly connections: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ConnectionCard_connection">;
    }>;
    readonly credentials: ReadonlyArray<{
      readonly id: string;
    }>;
  };
};
export type HomeViewConnectionsQuery = {
  response: HomeViewConnectionsQuery$data;
  variables: HomeViewConnectionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Credential",
  "kind": "LinkedField",
  "name": "credentials",
  "plural": true,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeViewConnectionsQuery",
    "selections": [
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
            "concreteType": "Connection",
            "kind": "LinkedField",
            "name": "connections",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConnectionCard_connection"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
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
    "name": "HomeViewConnectionsQuery",
    "selections": [
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isStateCompleted",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "protocol",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "protocolVersion",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "did",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "threadId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "invitationDid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "oobId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "mediatorId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isReady",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRequester",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "autoAcceptConnection",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "errMessage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "72f0e2a7658dba716e6bf18f767ba7a2",
    "id": null,
    "metadata": {},
    "name": "HomeViewConnectionsQuery",
    "operationKind": "query",
    "text": "query HomeViewConnectionsQuery {\n  agent {\n    connections {\n      ...ConnectionCard_connection\n    }\n    credentials {\n      id\n    }\n  }\n}\n\nfragment ConnectionCard_connection on Connection {\n  id\n  theirDid\n  theirLabel\n  state\n  role\n  ...ConnectionDetailsModal_connection\n}\n\nfragment ConnectionDetailsModal_connection on Connection {\n  id\n  state\n  isStateCompleted\n  role\n  protocol\n  protocolVersion\n  did\n  theirDid\n  theirLabel\n  threadId\n  invitationDid\n  oobId\n  mediatorId\n  isReady\n  isRequester\n  autoAcceptConnection\n  errMessage\n}\n"
  }
};
})();

(node as any).hash = "eabbf7b3d2a104fc45dc8bd77916466a";

export default node;
