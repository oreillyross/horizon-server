import dailyStarSources  from './dailystar'
import nnaSources from './nna'
import * as fs from 'fs'

function checkForArticles() {
    
}

const articleChecker = setInterval(checkForArticles, 2000)

dailyStarSources.then((values => {
    let json = JSON.stringify(values)
    console.log(json)
    fs.writeFile('articles.json', json, 'utf8', () => {
        console.log('written')
    });
}))

const sources = []

export { sources as default }