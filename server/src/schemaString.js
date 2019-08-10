import { liveSubscriptionTypeDef } from 'graphql-live-subscriptions'

const liveSubscription = liveSubscriptionTypeDef({
  queryType: 'LiveQueryRoot',
})

const schemaString = `
  type Subscription

  type LiveQueryRoot {
    houses: [House!]!
    jedis: [Jedi!]!
  }

  type Query {
    houses: [House!]!
    jedis: [Jedi!]!
    someNonLiveField: String!
  }

  type House {
    id: ID!
    address: String!
  }

  type Jedi {
    id: ID!
    name: String!
    house: House
  }
`

export default [
  schemaString,
  liveSubscription,
]
