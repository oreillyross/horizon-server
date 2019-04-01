import { prisma } from '../generated/prisma-client'
//import { fakeArticles } from './fakeArticles'
import { getArticlesFromWeb } from './articles' //uncomment when going live


const createEvent = async event => {
   return await prisma.createEvent(event)
}

async function main() {
  const webArticles = await getArticlesFromWeb()
  webArticles.map(wa => {
    async function go() {
       const exist = await prisma.$exists.event({title: wa.title})
       if (!exist) {
           createEvent(wa)
       }
    }
    setTimeout(() => go(), 100)
  })
  
  
}

export { main }


