/**
 * @generated SignedSource<<850c63ed85948718161233f72bec4291>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionCard_connection$data = {
  readonly id: string;
  readonly role: string;
  readonly state: string;
  readonly theirDid: string | null;
  readonly theirLabel: string | null;
  readonly " $fragmentType": "ConnectionCard_connection";
};
export type ConnectionCard_connection$key = {
  readonly " $data"?: ConnectionCard_connection$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionCard_connection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectionCard_connection",
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
    }
  ],
  "type": "Connection",
  "abstractKey": null
};

(node as any).hash = "a839869ee5d849a8c65af1d2d9b27c47";

export default node;
