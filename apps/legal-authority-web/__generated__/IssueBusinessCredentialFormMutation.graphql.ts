/**
 * @generated SignedSource<<3abd25f1becf549a1926063078760bcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResultStatus = "FAILED" | "SUCCESS" | "%future added value";
export type IssueCredentialInput = {
  attributes: ReadonlyArray<IssueCredentialAttribute>;
  connectionId: string;
};
export type IssueCredentialAttribute = {
  name: string;
  value: string;
};
export type IssueBusinessCredentialFormMutation$variables = {
  input: IssueCredentialInput;
};
export type IssueBusinessCredentialFormMutation$data = {
  readonly issueCredential: {
    readonly payload: string;
    readonly status: ResultStatus;
  };
};
export type IssueBusinessCredentialFormMutation = {
  response: IssueBusinessCredentialFormMutation$data;
  variables: IssueBusinessCredentialFormMutation$variables;
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
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "issueCredential",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "payload",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueBusinessCredentialFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueBusinessCredentialFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d489175fdfa0cf8b401d0048fdf28a5c",
    "id": null,
    "metadata": {},
    "name": "IssueBusinessCredentialFormMutation",
    "operationKind": "mutation",
    "text": "mutation IssueBusinessCredentialFormMutation(\n  $input: IssueCredentialInput!\n) {\n  issueCredential(input: $input) {\n    status\n    payload\n  }\n}\n"
  }
};
})();

(node as any).hash = "919a276d7ab84742f5d670e519153f11";

export default node;
