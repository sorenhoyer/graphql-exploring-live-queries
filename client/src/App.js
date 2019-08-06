import React from 'react';
import { QueryRenderer } from 'react-relay';
import environment from './environment';
import AppQuery from './relay/queries/AppQuery';
import requestSubscription from './relay/subscriptions/LiveSubscription';

export default class App extends React.Component {
  componentDidMount() {
    requestSubscription();
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={AppQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>Jedis: {JSON.stringify(props.jedis, null, 2)}</div>;
        }}
      />
    );
  }
}
