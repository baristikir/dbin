/**
 * @generated SignedSource<<73e568dabae2f8071f46faa95fb6052b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResultStatus = "FAILED" | "SUCCESS" | "%future added value";
export type AcceptProposalInput = {
  connectionId: string;
  credentialId: string;
};
export type ConnectionCredentialsInfoAcceptMutation$variables = {
  input: AcceptProposalInput;
};
export type ConnectionCredentialsInfoAcceptMutation$data = {
  readonly acceptProposal: {
    readonly payload: string;
    readonly status: ResultStatus;
  };
};
export type ConnectionCredentialsInfoAcceptMutation = {
  response: ConnectionCredentialsInfoAcceptMutation$data;
  variables: ConnectionCredentialsInfoAcceptMutation$variables;
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
    "name": "acceptProposal",
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
    "name": "ConnectionCredentialsInfoAcceptMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectionCredentialsInfoAcceptMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7f62672e4bc91ebad87ac1105258029a",
    "id": null,
    "metadata": {},
    "name": "ConnectionCredentialsInfoAcceptMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectionCredentialsInfoAcceptMutation(\n  $input: AcceptProposalInput!\n) {\n  acceptProposal(input: $input) {\n    status\n    payload\n  }\n}\n"
  }
};
})();

(node as any).hash = "31947fbcd749bf4e4a73bace4c3f0410";

export default node;
