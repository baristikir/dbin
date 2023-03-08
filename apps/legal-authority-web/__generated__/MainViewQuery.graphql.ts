/**
 * @generated SignedSource<<ac44c9d27b0dc96f0b27dc7f7983d7d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainViewQuery$variables = {};
export type MainViewQuery$data = {
  readonly agent: {
    readonly credentialDefinition: {
      readonly " $fragmentSpreads": FragmentRefs<"CredentialDefinitionInfo_definition">;
    } | null;
    readonly credentialSchema: {
      readonly " $fragmentSpreads": FragmentRefs<"CredentialSchemaInfo_schema">;
    } | null;
    readonly isInitialized: boolean;
    readonly label: string;
  };
};
export type MainViewQuery = {
  response: MainViewQuery$data;
  variables: MainViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInitialized",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ver",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Agent",
        "kind": "LinkedField",
        "name": "agent",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CredentialSchema",
            "kind": "LinkedField",
            "name": "credentialSchema",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CredentialSchemaInfo_schema"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CredentialDefinition",
            "kind": "LinkedField",
            "name": "credentialDefinition",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CredentialDefinitionInfo_definition"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Agent",
        "kind": "LinkedField",
        "name": "agent",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CredentialSchema",
            "kind": "LinkedField",
            "name": "credentialSchema",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "attributes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "seqNo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "version",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CredentialDefinition",
            "kind": "LinkedField",
            "name": "credentialDefinition",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tag",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac7241bbd6ebaf0b4c1af65f8f67bb8c",
    "id": null,
    "metadata": {},
    "name": "MainViewQuery",
    "operationKind": "query",
    "text": "query MainViewQuery {\n  agent {\n    label\n    isInitialized\n    credentialSchema {\n      ...CredentialSchemaInfo_schema\n    }\n    credentialDefinition {\n      ...CredentialDefinitionInfo_definition\n    }\n  }\n}\n\nfragment CredentialDefinitionInfo_definition on CredentialDefinition {\n  id\n  schemaId\n  type\n  tag\n  ver\n}\n\nfragment CredentialSchemaInfo_schema on CredentialSchema {\n  id\n  attributes\n  name\n  ver\n  seqNo\n  version\n}\n"
  }
};
})();

(node as any).hash = "8a17118e0a1ed646de45458ca99d67e3";

export default node;
