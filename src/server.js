import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json'
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import getStoreInstance, { initialState } from './store';
import { subscribeToLiveData } from 'graphql-live-subscriptions'
import schemaString from './schemaString'

const store = getStoreInstance();

const resolvers = {
  // graphql-live-subscriptions requires a JSON Scalar resolver
  JSON: GraphQLJSON,

  Subscription: {
    live: {
      resolve: source => source, // is always undefined
      subscribe: subscribeToLiveData({
        initialState: (source, args, context) => {
          console.log("initialState");
          console.log(context)
          return store.state;
        },
        eventEmitter: (source, args, context) => {
          console.log("eventEmitter");
          console.log(source) // is always undefined
          console.log(args)
          console.log(context)
          return store.eventEmitter;
        },
        sourceRoots: {
          Jedi: ['houses'],
        },
      }),
    },
  },
  Query: {
    houses: (jedi, args, context) => {
      const { state } = store

      return state.houses
    },
    jedis: (jedi, args, context) => {
      const { state } = store

      return state.jedis
    },
  },
  House: {
    address: (house, args) => {
      if (args.includePostalCode) {
        return `${house.address} ${house.postalCode}`
      }
      return house.address
    },
  },
  Jedi: {
    houses: (jedi, args, context) => {
      const { state } = store

      return jedi.houseIDs.map(id => (
        state.houses.find(house => house.id === id)
      ))
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
})

var app = express();
const server = createServer(app);

app.use('/graphql', cors(), bodyParser.json(), graphqlHTTP((request, response, graphQLParams) => {
  return {
    schema: schema,
    context: { store },
    graphiql: false,
  }
}));
app.get('/playground', expressPlayground({ endpoint: '/graphql', subscriptionEndpoint: 'ws://localhost:4000/subscriptions' }));
// app.listen(4000)

let isFirstRun = true;

server.listen(4000, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (message, params, webSocket) => {
        if(isFirstRun) {
          // I know this is a terrible approach, but how to simulate an update that i verifyable from http://localhost:4000/playground?
          setTimeout(() => {
            let nextState = store.state
            nextState = nextState
              .updateIn(['jedis'], (jedis) => {
                // eslint-disable-next-line
                jedis[0] = jedis[0].set('id', 'a_different_id')
                return [...jedis]
              })
            console.log(nextState)
            store.eventEmitter.emit('update', { nextState }) // where to emit this event?????
          }, 10000);
          isFirstRun = true;
        }
        return { ...params, context: { store } }
      },
    },
    {
      server: server,
      path: '/subscriptions',
    },
  );
  console.log(`GraphQL Server is now running on http://localhost:4000/graphql`);
  console.log(`Subscriptions are running on ws://localhost:4000/subscriptions`);
});
