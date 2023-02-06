/**
 * @generated SignedSource<<3b21cfec487f697e9a04dcedbe5085cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueCredentialConnectionInfo_connection$data = {
  readonly did: string | null;
  readonly id: string;
  readonly protocol: string | null;
  readonly protocolVersion: string | null;
  readonly rawState: string;
  readonly state: string;
  readonly theirDid: string | null;
  readonly theirLabel: string | null;
  readonly " $fragmentType": "IssueCredentialConnectionInfo_connection";
};
export type IssueCredentialConnectionInfo_connection$key = {
  readonly " $data"?: IssueCredentialConnectionInfo_connection$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueCredentialConnectionInfo_connection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueCredentialConnectionInfo_connection",
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
  "type": "Connection",
  "abstractKey": null
};

(node as any).hash = "62c8e742f2e71492e8f58143a41bf69a";

export default node;
