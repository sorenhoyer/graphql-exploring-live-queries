export const applyOperation = (store, operation) => {
  // First we'd need to convert Relays array of patch RecordProxies to js objects

  // const patchConvertedToJSFromRecordProxies = [
  //   {
  //     "op": "remove",
  //     "path": "/jedis/0",
  //     "from": null,
  //     "value": null,
  //   },
  //   {
  //     "op": "add",
  //     "path": "/jedis/0",
  //     "from": null,
  //     "value": {
  //       "id": "a_different_id",
  //       "name": "Luke Skywalker",
  //       "houses": [
  //         {
  //           "id": "legit_road",
  //           "address": "200 legit rd 90211"
  //         }
  //       ]
  //     }
  //   }
  // ];

  // Replace is more straightforward
  const patchConvertedToJSFromRecordProxies = [
    {
      "op": "replace",
      "path": "/jedis/1/name",
      "from": '',
      "value": 'Yoda 2',
    },
  ];

  for (const p of patchConvertedToJSFromRecordProxies) {
    if (p.op === 'replace') {
      // Currently only supports paths of array/element/property
      const path = p.path.split('/').filter(item => item !== '');

      const list = store.getRoot().getLinkedRecords(path[0]);

      if (list && list[path[1]]) list[path[1]].setValue(p.value, path[2])
    }
  }
}
