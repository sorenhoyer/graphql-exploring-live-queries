export const applyPatch = (store, patch) => {
  if (patch) {
    // First we'd need to convert Relays array of patch RecordProxies to js objects
    const operations = [];

    for (const operationRecordProxy of patch) {
      const operation = {
        op: operationRecordProxy.getValue('op'),
        path: operationRecordProxy.getValue('path'),
        from: operationRecordProxy.getValue('from'),
        value: operationRecordProxy.getValue('value'),
      }

      operations.push(operation)
    }
    console.log(operations);

    // const patchConvertedToJSFromRecordProxies = [
    //   {
    //     "op": "replace",
    //     "path": "/jedis/1/name",
    //     "from": '',
    //     "value": 'Yoda 2',
    //   },
    // ];

    for (const operation of operations) {
      applyOperation(store, operation);
    }
  }

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

}

export const applyOperation = (store, operation) => {
  if (operation.op === 'replace') {
    // Currently only supports paths of array/element/property
    const path = operation.path.split('/').filter(item => item !== '');

    const list = store.getRoot().getLinkedRecords(path[0]);

    if (list && list[path[1]]) list[path[1]].setValue(operation.value, path[2])
  } else if (operation.op === 'remove') {
    // Currently only supports paths of array/element/property
    const path = operation.path.split('/').filter(item => item !== '');
    const list = store.getRoot().getLinkedRecords(path[0]);
    if (list && list[path[1]]) {
      const dataID = list[path[1]].getDataID();
      if (dataID) store.delete(dataID);
    }

  } else if (operation.op === 'add') {
    // Currently only supports paths of array/element/property
    const path = operation.path.split('/').filter(item => item !== '');
    const list = store.getRoot().getLinkedRecords(path[0]);
    if (list) {
      const newRecord = store.create(operation.value.id/* dataID */, 'Jedi')
      for (const key in operation.value) {
        console.log(key)
        // issue https://github.com/facebook/relay/issues/2441
        if (typeof operation.value[key] !== 'array' && typeof operation.value[key] !== 'object' && operation.value[key] !== null) {
          newRecord.setValue(operation.value[key], key);
        }

      }
      console.log(newRecord);
      console.log([...list, newRecord])
      const newRecords = [...list, newRecord].filter(item => item);
      console.log(newRecords);
      store.getRoot().setLinkedRecords(newRecords, path[0]); //
    }
  }
}
