import { prisma } from '../generated/prisma-client'
//import { fakeArticles } from './fakeArticles'
import { getArticlesFromWeb } from './articles' //uncomment when going live
import { getArticlesForADay } from './database'


const createArticle = async article => {
   return await prisma.createArticle(article)
}

const saveArticles = async (articles: Array<Articles>) => {
   return await Promise.all(articles.map(article => createArticle(article)))
}

// get all the articles for today from the database
// then get all the articles from the web, in testing it will be fakeArticles
// then filter / map webArticles from dbArticles
// whats left saveArticles (webArticles)

async function main() {
  const webArticles = await getArticlesFromWeb()
  webArticles.map(wa => {
    async function go() {
       const exist = await prisma.$exists.article({title: wa.title})
       if (!exist) {
           createArticle(wa)
       }
    }
    setTimeout(() => go(), 100)
  })
  
  
}

export { main }


