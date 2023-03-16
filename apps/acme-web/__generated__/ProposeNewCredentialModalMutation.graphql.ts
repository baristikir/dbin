/**
 * @generated SignedSource<<ac1105f303cc51d3ba341ff09b946035>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProposeCredentialInput = {
  connectionId: string;
  created_at: string;
  registered_adress: string;
  registered_country: string;
  registered_name: string;
};
export type ProposeNewCredentialModalMutation$variables = {
  input: ProposeCredentialInput;
};
export type ProposeNewCredentialModalMutation$data = {
  readonly proposeCredential: boolean;
};
export type ProposeNewCredentialModalMutation = {
  response: ProposeNewCredentialModalMutation$data;
  variables: ProposeNewCredentialModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "proposeCredential",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProposeNewCredentialModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProposeNewCredentialModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "790226a8b2640284ae123ff3d77a9ee0",
    "id": null,
    "metadata": {},
    "name": "ProposeNewCredentialModalMutation",
    "operationKind": "mutation",
    "text": "mutation ProposeNewCredentialModalMutation(\n  $input: ProposeCredentialInput!\n) {\n  proposeCredential(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "2664c184d20cdcb55ac989c407b54e82";

export default node;
