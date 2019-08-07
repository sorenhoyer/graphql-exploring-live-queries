import { applyOperation } from '../../jsonpatch'
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
        console.log(environment)
        const rootField = store.getRootField('live');
        const patch = rootField.getLinkedRecords('patch');
        console.log(rootField)
        console.log(patch);

        // Here goes some jsonpatch magic???

        applyOperation(store, patch);

        // Do we need to code our own relay jsonpatch-relays library?
      },
      // optional but recommended:
      onCompleted: () => {/* server closed the subscription */ },
      onError: error => console.error(error),
    }
  );
}
