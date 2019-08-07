import { applyOperation } from 'fast-json-patch'
import { graphql, requestSubscription } from 'react-relay';
import environment from '../../environment';

const subscription = graphql`
  subscription LiveSubscription {
    live {
      query {
        jedis {
          id,
          name,
          houses {
            id
            address(includePostalCode: true)
          }
        }
      },
      patch {op,path,from,value}
    }
  }
`;

const variables = {};

export default () => {
  requestSubscription(
    environment, // see Environment docs
    {
      subscription,
      variables,
      updater: store => {
        console.log(store)
        const rootField = store.getRootField('live');
        const patch = rootField.getLinkedRecords('patch');

        // Here goes some jsonpatch magic???

        // const jedis = store.getRoot().getLinkedRecords('jedis');
        // applyOperation(jedis, patch, true, true);

        console.log(rootField)
        console.log(patch);

        // console.log(jedis)
      },
      // optional but recommended:
      onCompleted: () => {/* server closed the subscription */ },
      onError: error => console.error(error),
    }
  );
}
