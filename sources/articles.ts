import dailyStarSources  from './dailystar'
import naharnetSources from './naharnet'
import nnaSources from './nna'

type Article = {
     title: String,
     description: String,
     source: String,
     href: String,
     date: Date
}


async function getArticlesFromWeb() {
    
    let dailyStarArticles:Array<Article> 
    let nnaArticles:Array<Article> 
    let naharnetArticles: any 
    
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

export { getArticlesFromWeb }