/**
 * @generated SignedSource<<0b7e26dd8c01a0642896a4725000887b>>
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
  readonly connections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionCard_connection">;
  }>;
};
export type HomeViewConnectionsQuery = {
  response: HomeViewConnectionsQuery$data;
  variables: HomeViewConnectionsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeViewConnectionsQuery",
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
          },
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
      }
    ]
  },
  "params": {
    "cacheID": "f061d69aeb8ec7590c58022ff1c31e7b",
    "id": null,
    "metadata": {},
    "name": "HomeViewConnectionsQuery",
    "operationKind": "query",
    "text": "query HomeViewConnectionsQuery {\n  connections {\n    ...ConnectionCard_connection\n  }\n}\n\nfragment ConnectionCard_connection on Connection {\n  id\n  theirDid\n  theirLabel\n  state\n  role\n  ...ConnectionDetailsModal_connection\n}\n\nfragment ConnectionDetailsModal_connection on Connection {\n  id\n  state\n  isStateCompleted\n  role\n  protocol\n  protocolVersion\n  did\n  theirDid\n  theirLabel\n  threadId\n  invitationDid\n  oobId\n  mediatorId\n  isReady\n  isRequester\n  autoAcceptConnection\n  errMessage\n}\n"
  }
};

(node as any).hash = "74337597b15b43d896918549862b383d";

export default node;
