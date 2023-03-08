/**
 * @generated SignedSource<<49b7b7e105553c87a60b08c50e3ab190>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CredentialDefinitionInfo_definition$data = {
  readonly id: string;
  readonly schemaId: string;
  readonly tag: string;
  readonly type: string;
  readonly ver: string;
  readonly " $fragmentType": "CredentialDefinitionInfo_definition";
};
export type CredentialDefinitionInfo_definition$key = {
  readonly " $data"?: CredentialDefinitionInfo_definition$data;
  readonly " $fragmentSpreads": FragmentRefs<"CredentialDefinitionInfo_definition">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CredentialDefinitionInfo_definition",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ver",
      "storageKey": null
    }
  ],
  "type": "CredentialDefinition",
  "abstractKey": null
};

(node as any).hash = "48d9b38c4a53be8be7bac7d70647ffbf";

export default node;
