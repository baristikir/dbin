/**
 * @generated SignedSource<<e5d418006d7ff03257e399165ba32481>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConnectionsViewCreateInvitationMutation$variables = {};
export type ConnectionsViewCreateInvitationMutation$data = {
  readonly createInvitation: string;
};
export type ConnectionsViewCreateInvitationMutation = {
  response: ConnectionsViewCreateInvitationMutation$data;
  variables: ConnectionsViewCreateInvitationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createInvitation",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionsViewCreateInvitationMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConnectionsViewCreateInvitationMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d0a8dddb45bcf4a2032397cb82b12453",
    "id": null,
    "metadata": {},
    "name": "ConnectionsViewCreateInvitationMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectionsViewCreateInvitationMutation {\n  createInvitation\n}\n"
  }
};
})();

(node as any).hash = "870a6f0988ebcfa3989fc5bc0d2eeca5";

export default node;
