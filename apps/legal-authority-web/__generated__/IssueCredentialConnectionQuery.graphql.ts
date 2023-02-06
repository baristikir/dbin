/**
 * @generated SignedSource<<e53f361c1361e89cfe68e8a7db2bbee6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueCredentialConnectionQuery$variables = {
  id: string;
};
export type IssueCredentialConnectionQuery$data = {
  readonly connection: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"IssueCredentialConnectionInfo_connection">;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueCredentialConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Connection",
        "kind": "LinkedField",
        "name": "connection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IssueCredentialConnectionInfo_connection"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueCredentialConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Connection",
        "kind": "LinkedField",
        "name": "connection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "744a562f5db6c8da318dd4fa397c71d9",
    "id": null,
    "metadata": {},
    "name": "IssueCredentialConnectionQuery",
    "operationKind": "query",
    "text": "query IssueCredentialConnectionQuery(\n  $id: String!\n) {\n  connection(id: $id) {\n    id\n    ...IssueCredentialConnectionInfo_connection\n  }\n}\n\nfragment IssueCredentialConnectionInfo_connection on Connection {\n  id\n  state\n  rawState\n  protocol\n  protocolVersion\n  did\n  theirDid\n  theirLabel\n}\n"
  }
};
})();

(node as any).hash = "f43248c08620315b3db949b02021cf12";

export default node;
