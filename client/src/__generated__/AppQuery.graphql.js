/**
 * @flow
 * @relayHash 20d73f507f9b35386809903cbc527343
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +jedis: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +houses: $ReadOnlyArray<{|
      +id: string,
      +address: string,
    |}>,
  |}>
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  jedis {
    id
    name
    houses {
      id
      address(includePostalCode: true)
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "jedis",
    "storageKey": null,
    "args": null,
    "concreteType": "Jedi",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "houses",
        "storageKey": null,
        "args": null,
        "concreteType": "House",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "address",
            "args": [
              {
                "kind": "Literal",
                "name": "includePostalCode",
                "value": true
              }
            ],
            "storageKey": "address(includePostalCode:true)"
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  jedis {\n    id\n    name\n    houses {\n      id\n      address(includePostalCode: true)\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1ccd1b15d1270dcd363d2c71f2794c84';
module.exports = node;
