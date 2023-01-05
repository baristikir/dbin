/**
 * @generated SignedSource<<85cd4e325014565dac3213ebce5a8fc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveConnectionInput = {
  connectionId: string;
};
export type ConnectionCardDeleteMutation$variables = {
  input: RemoveConnectionInput;
};
export type ConnectionCardDeleteMutation$data = {
  readonly removeConnection: boolean;
};
export type ConnectionCardDeleteMutation = {
  response: ConnectionCardDeleteMutation$data;
  variables: ConnectionCardDeleteMutation$variables;
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
    "name": "removeConnection",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionCardDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectionCardDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "dfd5c9e1183f732534cf6c2d35ac8c4a",
    "id": null,
    "metadata": {},
    "name": "ConnectionCardDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectionCardDeleteMutation(\n  $input: RemoveConnectionInput!\n) {\n  removeConnection(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "6b9ff5e8acf5186f14ab51802977eef3";

export default node;
