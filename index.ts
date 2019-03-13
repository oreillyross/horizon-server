import { GraphQLServer } from 'graphql-yoga'
import DateTime from '@okgrow/graphql-scalars'
import naharnetSources  from './sources/naharnet'
import nnaSources from './sources/nna'
import dailyStarSources from './sources/dailystar'
import sources from './sources/articles'

console.log(sources)

const typeDefs = `
   
   scalar DateTime
   
   type Articles {
      date: DateTime
      title: String
      description: String
      href: String
      
   }
   
   type Query {
     naharnetArticles: [Articles!]!
     nnaArticles: [Articles!]!
     dailyStarArticles: [Articles!]!
   }
 `



const resolvers = {
  DateTime,
  Query: {
    naharnetArticles: (parent, args, context, info) => naharnetSources,
    nnaArticles: (parent, args, context, info) => nnaSources,
    dailyStarArticles: (parent, args, context, info) => dailyStarSources
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server running'))

