import { makeExecutableSchema } from '@graphql-tools/schema'
import type { GraphQLContext } from './context'
import type { User } from '@prisma/client'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    users: [User!]!
    coffee(id: ID!): Coffee
  }

  type Mutation {
    postUser(name: String!, email: String!, password: String!): User!
    postCoffeeToUser(userId: ID!, amount: Int!, note: String!): Coffee!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    password: String
  }

  type Coffee {
    id: ID!
    note: String!
    amount: Int!
  }
`

const resolvers = {
  Query: {
    info: () => `This is the API of my Coffee Consumption`,
    users: async (parent: unknown, args: {}, context: GraphQLContext) => {
      return context.prisma.user.findMany()
    },
  },
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    name: (parent: User) => parent.name,
  },
  Mutation: {
    postUser: async (
      parent: unknown,
      args: { email: string; name: string; password: string },
      context: GraphQLContext
    ) => {
      const newUser = await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      })
      return newUser
    },
    postCoffeeToUser: async (
      parent: unknown,
      args: { userId: string; note: string; amount: number },
      context: GraphQLContext
    ) => {
      const newCoffee = await context.prisma.coffee.create({
        data: {
          note: args.note,
          amount: args.amount,
          userId: args.userId,
        },
      })
      return newCoffee
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
