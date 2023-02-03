/**
 * @generated SignedSource<<702df33d9bc98aa998813fffb395fa54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type IssueCredentialConnectionQuery$variables = {
  id: string;
};
export type IssueCredentialConnectionQuery$data = {
  readonly connection: {
    readonly did: string | null;
    readonly id: string;
    readonly protocol: string | null;
    readonly protocolVersion: string | null;
    readonly rawState: string;
    readonly state: string;
    readonly theirDid: string | null;
    readonly theirLabel: string | null;
  };
};
export type IssueCredentialConnectionQuery = {
  response: IssueCredentialConnectionQuery$data;
  variables: IssueCredentialConnectionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Connection",
    "kind": "LinkedField",
    "name": "connection",
    "plural": false,
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
        "name": "state",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rawState",
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
        "name": "theirDid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "theirLabel",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueCredentialConnectionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueCredentialConnectionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4c9efb88a85604986e5aa2649412e831",
    "id": null,
    "metadata": {},
    "name": "IssueCredentialConnectionQuery",
    "operationKind": "query",
    "text": "query IssueCredentialConnectionQuery(\n  $id: String!\n) {\n  connection(id: $id) {\n    id\n    state\n    rawState\n    protocol\n    protocolVersion\n    did\n    theirDid\n    theirLabel\n  }\n}\n"
  }
};
})();

(node as any).hash = "52b6afe25fa3949e54777e08373bec2a";

export default node;
