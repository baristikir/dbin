/**
 * @generated SignedSource<<69a6bc4c538d07c59e906cea2897029d>>
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
export type ContentConnectionDeleteMutation$variables = {
  input: RemoveConnectionInput;
};
export type ContentConnectionDeleteMutation$data = {
  readonly removeConnection: boolean;
};
export type ContentConnectionDeleteMutation = {
  response: ContentConnectionDeleteMutation$data;
  variables: ContentConnectionDeleteMutation$variables;
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
    "name": "ContentConnectionDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContentConnectionDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5839024487e7b15204a10f21b77ea4b",
    "id": null,
    "metadata": {},
    "name": "ContentConnectionDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ContentConnectionDeleteMutation(\n  $input: RemoveConnectionInput!\n) {\n  removeConnection(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "f519d73b7d77078c114aaefdb627d9f7";

export default node;
