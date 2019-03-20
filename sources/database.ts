import { prisma } from '../generated/prisma-client'
import { startOfDay, addDays } from 'date-fns'

// get articles for a specific day
export async function getArticlesForADay(date: Date) {
    const startDate = startOfDay(date).toISOString()
    const endDate = startOfDay(addDays(date, 1)).toISOString()
 
    const articles = await prisma.articles(
        {
          where : {
              date_gte: startDate,
              date_lt: endDate
          } 
        })
    return articles
}

export { getArticlesForADay }