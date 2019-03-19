import dailyStarSources  from './dailystar'
import naharnetSources from './naharnet'
import nnaSources from './nna'
import * as fs from 'fs'
import { prisma } from '../generated/prisma-client'
import { startOfDay, addDays } from 'date-fns'

// get articles for a specific day
export async function getTodaysArticles() {
    const today = startOfDay(new Date()).toISOString()
    const tomorrow = startOfDay(addDays(new Date(), 1)).toISOString()
    console.log(tomorrow, today)
    
    const articles = await prisma.articles(
        {
          where : {
              date_gte: today,
              date_lt: tomorrow
            
          } 
        })
    return articles
}


async function getArticles() {
    
    let dailyStarArticles = []
    let nnaArticles = []
    let naharnetArticles = []
    
    console.log('Checking for articles...')
    try {
      dailyStarArticles = await dailyStarSources
      console.log(`got ${dailyStarArticles.length} dailystararticles`)
    } 
    catch (err) { 
        console.error(err)
    }
    try {
    nnaArticles = await nnaSources
    console.log(`got ${nnaArticles.length} nnaArticles`)
    } catch (err) {
        console.error(err)
    }
    try {
    naharnetArticles = await naharnetSources.catch((err) => {console.log('error in naharnet')})
    console.log(`got ${naharnetArticles.length} naharnetArticles`)
    } catch (err) {
        console.error(err)
    }
    const sources = [...dailyStarArticles, ...nnaArticles, ...naharnetArticles]
    return sources
}



export { getArticles }