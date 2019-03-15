import dailyStarSources  from './dailystar'
import naharnetSources from './naharnet'
import nnaSources from './nna'
import * as fs from 'fs'

async function checkForArticles() {
    
    let dailyStarArticles = []
    let nnaArticles = []
    let naharnetArticles = []
    
    console.log('start of check for articles')
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
    console.log(`Trying to get Naharnet articles`)
    naharnetArticles = await naharnetSources.catch((err) => {console.log('error in naharnet')})
    console.log(`got ${naharnetArticles.length} naharnetArticles`)
    } catch (err) {
        console.error(err)
    }
    console.log(`${dailyStarArticles.length},${nnaArticles.length}, ${naharnetSources.length} `)
    const sources = JSON.stringify([...dailyStarArticles, ...nnaArticles, ...naharnetArticles])
    fs.writeFile('articles.json', sources, 'utf8', () => {
        console.log('Files written successfully!')
    })
}

// const articleChecker = setInterval(checkForArticles, 2000)

// dailyStarSources.then((values => {
//     let json = JSON.stringify(values)
//     console.log(json)
//     fs.writeFile('articles.json', json, 'utf8', () => {
//         console.log('written')
//     });
// }))

checkForArticles()

const sources = []

export { sources as default }