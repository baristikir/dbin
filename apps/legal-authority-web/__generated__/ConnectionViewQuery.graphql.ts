/**
 * @generated SignedSource<<e72a9354e099640eaeb8f4f8678543eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionViewQuery$variables = {
  id: string;
};
export type ConnectionViewQuery$data = {
  readonly connection: {
    readonly messages: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ConnectionCredentialsInfo_message">;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"Content_connection">;
  } | null;
};
export type ConnectionViewQuery = {
  response: ConnectionViewQuery$data;
  variables: ConnectionViewQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Connection",
        "kind": "LinkedField",
        "name": "connection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Content_connection"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConnectionCredentialMessage",
            "kind": "LinkedField",
            "name": "messages",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConnectionCredentialsInfo_message"
              }
            ],
            "storageKey": null
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
    "name": "ConnectionViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
            "name": "role",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConnectionCredentialMessage",
            "kind": "LinkedField",
            "name": "messages",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credentialId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credentialState",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConnectionCredentialProposal",
                "kind": "LinkedField",
                "name": "proposal",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "credentialDefinitionId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "schemaId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "schemaName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "schemaIssuerDid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "schemaVersion",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "issuerDid",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConnectionCredentialProposalAttribute",
                "kind": "LinkedField",
                "name": "attributes",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6669b227b862b467ccb014e0208c1cd",
    "id": null,
    "metadata": {},
    "name": "ConnectionViewQuery",
    "operationKind": "query",
    "text": "query ConnectionViewQuery(\n  $id: String!\n) {\n  connection(id: $id) {\n    ...Content_connection\n    messages {\n      ...ConnectionCredentialsInfo_message\n    }\n  }\n}\n\nfragment ConnectionCredentialsInfo_message on ConnectionCredentialMessage {\n  credentialId\n  credentialState\n  proposal {\n    credentialDefinitionId\n    schemaId\n    schemaName\n    schemaIssuerDid\n    schemaVersion\n    issuerDid\n  }\n  attributes {\n    mime\n    name\n    value\n  }\n}\n\nfragment Content_connection on Connection {\n  id\n  state\n  rawState\n  role\n  protocol\n  protocolVersion\n  did\n  theirDid\n  theirLabel\n  threadId\n  invitationDid\n  oobId\n  mediatorId\n  isReady\n  isRequester\n  autoAcceptConnection\n  errMessage\n}\n"
  }
};
})();

(node as any).hash = "c07f58e5320277ee4d5ebd65191f5482";

export default node;
