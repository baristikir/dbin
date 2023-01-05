/**
 * @generated SignedSource<<97513978b797a246e284dd7b3fd8ecbc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectionDetailsModal_connection$data = {
  readonly autoAcceptConnection: boolean | null;
  readonly did: string | null;
  readonly errMessage: string | null;
  readonly id: string;
  readonly invitationDid: string | null;
  readonly isReady: boolean;
  readonly isRequester: boolean;
  readonly isStateCompleted: boolean;
  readonly mediatorId: string | null;
  readonly oobId: string | null;
  readonly protocol: string | null;
  readonly protocolVersion: string | null;
  readonly role: string;
  readonly state: string;
  readonly theirDid: string | null;
  readonly theirLabel: string | null;
  readonly threadId: string | null;
  readonly " $fragmentType": "ConnectionDetailsModal_connection";
};
export type ConnectionDetailsModal_connection$key = {
  readonly " $data"?: ConnectionDetailsModal_connection$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionDetailsModal_connection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectionDetailsModal_connection",
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
      "name": "isStateCompleted",
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
    }
  ],
  "type": "Connection",
  "abstractKey": null
};

(node as any).hash = "1f324fc6d2dc10cb00534004cf1fc13d";

export default node;
