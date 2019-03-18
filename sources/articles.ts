import dailyStarSources  from './dailystar'
import naharnetSources from './naharnet'
import nnaSources from './nna'
import * as fs from 'fs'

async function checkForArticles() {
    
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
    const sources = JSON.stringify([...dailyStarArticles, ...nnaArticles, ...naharnetArticles])
    fs.writeFile('./sources/articlesForHorizon.json', sources, 'utf8', () => {
        console.log(`Files written successfully!`)
    })
}


export { checkForArticles }