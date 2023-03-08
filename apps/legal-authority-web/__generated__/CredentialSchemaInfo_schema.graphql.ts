/**
 * @generated SignedSource<<111562ed4572fe9aa1233f35cfad55c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CredentialSchemaInfo_schema$data = {
  readonly attributes: ReadonlyArray<string>;
  readonly id: string;
  readonly name: string;
  readonly seqNo: number;
  readonly ver: string;
  readonly version: string;
  readonly " $fragmentType": "CredentialSchemaInfo_schema";
};
export type CredentialSchemaInfo_schema$key = {
  readonly " $data"?: CredentialSchemaInfo_schema$data;
  readonly " $fragmentSpreads": FragmentRefs<"CredentialSchemaInfo_schema">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CredentialSchemaInfo_schema",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ver",
      "storageKey": null
    },
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
  "type": "CredentialSchema",
  "abstractKey": null
};

(node as any).hash = "2fa77bad35b10c0547d749b84956d7b1";

export default node;
