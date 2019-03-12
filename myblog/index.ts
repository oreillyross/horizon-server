import * as path from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) { t.prismaFields(['*']) }
})
const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) { t.prismaFields(['*']) }
})

const User = prismaObjectType({
    name: "User",
    definition(t) {
        t.prismaFields(["id", "name", "posts"])
    }
})

const Post = prismaObjectType({
    name: "Post",
    definition(t) {
        t.string("upperCaseTitle",
        {
            resolve: ({title}, args, ctx) => title.toUpperCase()
        })
    }
})



const schema = makePrismaSchema({
  types: [Query, Mutation, User, Post],

  prisma: {
    datamodelInfo,
    client: prisma
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma }
})
server.start(() => console.log(`Server is running`))