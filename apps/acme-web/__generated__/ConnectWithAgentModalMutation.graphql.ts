/**
 * @generated SignedSource<<05819a44781e5a5ccc2c067426e6db77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConnectWithAgentInput = {
  url: string;
};
export type ConnectWithAgentModalMutation$variables = {
  input: ConnectWithAgentInput;
};
export type ConnectWithAgentModalMutation$data = {
  readonly acceptInvitation: boolean;
};
export type ConnectWithAgentModalMutation = {
  response: ConnectWithAgentModalMutation$data;
  variables: ConnectWithAgentModalMutation$variables;
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
    "name": "acceptInvitation",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectWithAgentModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectWithAgentModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10d4fe33d4e3527a4de07dde9dde9674",
    "id": null,
    "metadata": {},
    "name": "ConnectWithAgentModalMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectWithAgentModalMutation(\n  $input: ConnectWithAgentInput!\n) {\n  acceptInvitation(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "f3394380afd95ebe80a4f865b31ae697";

export default node;
