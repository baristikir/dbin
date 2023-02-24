/**
 * @generated SignedSource<<fe3db738b64ecd5ad559dea31030044d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignInInput = {
  email: string;
  password: string;
};
export type SignInMutation$variables = {
  input: SignInInput;
};
export type SignInMutation$data = {
  readonly signIn: boolean;
};
export type SignInMutation = {
  response: SignInMutation$data;
  variables: SignInMutation$variables;
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
    "name": "signIn",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "82248f87957facc5b521d0065de419f0",
    "id": null,
    "metadata": {},
    "name": "SignInMutation",
    "operationKind": "mutation",
    "text": "mutation SignInMutation(\n  $input: SignInInput!\n) {\n  signIn(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "8aa5eb8c74a179e78eee1c7e0f618cba";

export default node;
