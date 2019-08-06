/**
 * @flow
 * @relayHash b39f2db075047929117c9e8d93c57353
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LiveSubscriptionVariables = {||};
export type LiveSubscriptionResponse = {|
  +live: ?{|
    +query: ?{|
      +jedis: $ReadOnlyArray<{|
        +id: string,
        +name: string,
        +houses: $ReadOnlyArray<{|
          +id: string,
          +address: string,
        |}>,
      |}>
    |},
    +patch: ?$ReadOnlyArray<?{|
      +op: string,
      +path: string,
      +from: ?string,
      +value: ?any,
    |}>,
  |}
|};
export type LiveSubscription = {|
  variables: LiveSubscriptionVariables,
  response: LiveSubscriptionResponse,
|};
*/


/*
subscription LiveSubscription {
  live {
    query {
      jedis {
        id
        name
        houses {
          id
          address(includePostalCode: true)
        }
      }
    }
    patch {
      op
      path
      from
      value
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
    "name": "live",
    "storageKey": null,
    "args": null,
    "concreteType": "Live",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "query",
        "storageKey": null,
        "args": null,
        "concreteType": "LiveQuery",
        "plural": false,
        "selections": [
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
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "patch",
        "storageKey": null,
        "args": null,
        "concreteType": "RFC6902Operation",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "op",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "path",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "from",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "value",
            "args": null,
            "storageKey": null
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
    "name": "LiveSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "LiveSubscription",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "LiveSubscription",
    "id": null,
    "text": "subscription LiveSubscription {\n  live {\n    query {\n      jedis {\n        id\n        name\n        houses {\n          id\n          address(includePostalCode: true)\n        }\n      }\n    }\n    patch {\n      op\n      path\n      from\n      value\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f2b6c487b46ff08f5630f21b23236530';
module.exports = node;
