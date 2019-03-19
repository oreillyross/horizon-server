import { prisma } from '../generated/prisma-client'
import { getArticles } from './articles'

const createArticle = async article => {
   return await prisma.createArticle(article)
}

const getSavedArticles = async (articles: Array<Articles>) => {
   return await Promise.all(articles.map(article => createArticle(article)))
}

export { getSavedArticles }
