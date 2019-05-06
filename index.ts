import * as path from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import { main } from './sources/import'


const Query = prismaObjectType({
  name: 'Query',
  definition: (t) => t.prismaFields(['*'])
})
const Mutation = prismaObjectType({
  name: 'Mutation',
  definition: (t) => t.prismaFields(['*'])
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

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

const oneHour = 1000 * 60 * 60

server.start(() => {
  
  console.log(`Server running`)
  
  main()
  
})