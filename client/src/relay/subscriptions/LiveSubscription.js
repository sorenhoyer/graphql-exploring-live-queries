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
        console.log(rootField)
        // Here goes some jsonpatch magic???
      },
      // optional but recommended:
      onCompleted: () => {/* server closed the subscription */ },
      onError: error => console.error(error),
    }
  );
}
