/**
 * @generated SignedSource<<426d6ed88942416f958bc2196f747889>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionDetailsModal_connection">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectionDetailsModal_connection"
    }
  ],
  "type": "Connection",
  "abstractKey": null
};

(node as any).hash = "f3001211c97116cc549143509a66b342";

export default node;
