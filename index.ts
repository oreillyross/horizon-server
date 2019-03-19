import { GraphQLServer } from 'graphql-yoga'
import DateTime from '@okgrow/graphql-scalars'
import * as fs from 'fs'
import * as uuidv4 from 'uuid/v4'
import * as mymod from './sources/articles'
import { checkForArticles } from './sources/articles'

const oneHour = 1000 * 60 * 60

checkForArticles()

setInterval(checkForArticles, oneHour)

let articlesJson = JSON.parse(fs.readFileSync('./sources/articlesForHorizon.json'))

articlesJson.forEach(o => o.id = uuidv4())

const typeDefs = `
   
  scalar DateTime
   
  type Articles {
      date: DateTime
      title: String
      description: String
      href: String
      id: String
      
  }
   
  type Query {
     articles: [Articles!]!
  }
 `



const resolvers = {
  DateTime,
  Query: {
    articles: (parent, args, context, info) => articlesJson
  },
}



const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => {
   
   console.log('Server started')
})

