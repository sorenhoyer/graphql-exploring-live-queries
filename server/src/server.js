import bodyParser from 'body-parser';
import cors from 'cors';
import EventEmitter from 'events'
import express from 'express';
import graphqlHTTP from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json'
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import getStoreInstance from './store';
import { subscribeToLiveData } from 'graphql-live-subscriptions'
import schemaString from './schemaString';
import { getHouses, getHouseById } from './database/house';
import { getJedis } from './database/jedi';

const store = getStoreInstance();

const eventEmitter = new EventEmitter();

setTimeout(() => {
  let nextState = store.state
  nextState = nextState
    .updateIn(['jedis'], (jedis) => {
      // eslint-disable-next-line
      jedis[0] = jedis[0].set('id', 'a_different_id')
      return [...jedis]
    })
  console.log(nextState)
  /* store. */eventEmitter.emit('update', { nextState }) // where to emit this event?????
}, 10000);

const resolvers = {
  // graphql-live-subscriptions requires a JSON Scalar resolver
  JSON: GraphQLJSON,

  Subscription: {
    live: {
      resolve: source => source, // is always undefined
      subscribe: subscribeToLiveData({
        initialState: async (source, args, context) => {
          console.log("initialState");
          console.log(source) // is always undefined
          console.log(args)
          console.log(context)
          const houses = await getHouses();
          const jedis = await getJedis();
          return {
            houses, jedis
          }
        },
        eventEmitter: (source, args, context) => {
          console.log("eventEmitter");
          console.log(source) // is always undefined
          console.log(args)
          // console.log(store)
          // return store.eventEmitter;
          return eventEmitter;
        },
        // sourceRoots: {
        //   Jedi: ['houses'],
        // },
      }),
    },
  },
  Query: {
    houses: async (jedi, args, context) => {
      // const { state } = store

      // return state.houses
      return await getHouses();
    },
    jedis: async(jedi, args, context) => {
      // const { state } = store

      // return state.jedis
      return await getJedis();
    },
  },
  House: {
    address: (house, args) => {
      return house.address
    },
  },
  Jedi: {
    house: async (jedi, args, context) => {
      console.log("SDFKSDLFKSLDFKS ", jedi.house_id)
      // const { state } = store

      // return jedi.houseIDs.map(id => (
      //   state.houses.find(house => house.id === id)
      // ))
      return await getHouseById(jedi.house_id);
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

server.listen(4000, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: server,
      path: '/subscriptions',
    },
  );
  console.log(`GraphQL Server is now running on http://localhost:4000/graphql`);
  console.log(`Subscriptions are running on ws://localhost:4000/subscriptions`);
});
