/**
 * @generated SignedSource<<5a653e2b1119bafd8ecfdece09dacb7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveConnectionInput = {
  id: string;
};
export type ConnectionDetailsModalDeleteMutation$variables = {
  input: RemoveConnectionInput;
};
export type ConnectionDetailsModalDeleteMutation$data = {
  readonly removeConnection: boolean;
};
export type ConnectionDetailsModalDeleteMutation = {
  response: ConnectionDetailsModalDeleteMutation$data;
  variables: ConnectionDetailsModalDeleteMutation$variables;
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
    "name": "ConnectionDetailsModalDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectionDetailsModalDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e45a70ec9b128e25ecdac15b9146963e",
    "id": null,
    "metadata": {},
    "name": "ConnectionDetailsModalDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectionDetailsModalDeleteMutation(\n  $input: RemoveConnectionInput!\n) {\n  removeConnection(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "30662bdb03ae49aeb6df3ac210077827";

export default node;
