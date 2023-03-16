/**
 * @generated SignedSource<<1094dc39a2bfecf0e809b5af4e53dca2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionCredentialsInfo_message$data = ReadonlyArray<{
  readonly attributes: ReadonlyArray<{
    readonly mime: string;
    readonly name: string;
    readonly value: string;
  }>;
  readonly credentialId: string;
  readonly credentialState: string;
  readonly proposal: {
    readonly credentialDefinitionId: string;
    readonly issuerDid: string;
    readonly schemaId: string;
    readonly schemaIssuerDid: string;
    readonly schemaName: string;
    readonly schemaVersion: string;
  };
  readonly " $fragmentType": "ConnectionCredentialsInfo_message";
}>;
export type ConnectionCredentialsInfo_message$key = ReadonlyArray<{
  readonly " $data"?: ConnectionCredentialsInfo_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionCredentialsInfo_message">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ConnectionCredentialsInfo_message",
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
  "type": "ConnectionCredentialMessage",
  "abstractKey": null
};

(node as any).hash = "2cfb38595314d0c7fe84751873514f6e";

export default node;
