import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

const href = 'http://nna-leb.gov.lb/en/news-categories/2/Security'

const getMainSources = async url => {
    let sources = []
    try {
        const response = await fetch(url)
        const html = await response.text()
        let $ = cheerio.load(html)
        $('.bannerfeatured-content a')
            .each(function() {
                let href = $(this).attr('href')
                sources.push(href)
            })
    }
    catch (err) {
        console.log(err)
    }
    finally {
        return sources
    }
}

//getMainSources(href).then(data => console.log(data))

const getArticleData = async article => {
    
    try {
        const response = await fetch(article)
        const html = await response.text()
        let $ = cheerio.load(html)
        const title = $('div ol li:nth-child(3)').text().trim()
        const description = $('.article-content p').text().trim()
        const source = 'National News Agency'
        const date = new Date()
        const href = article
         return {
    
            title,
            description,
            source,
            href,
            date
        }
    } catch (err) {
        console.error(err)
    }    
       
    

}

// const article = 'http://nna-leb.gov.lb/en/show-news/95478/Army-martyr-falls-others-seriously-wounded-in-overnight-raid-in-Hermel'
// getArticleData(article).then(data => console.log(data))


 const getSources = url => {
   return getMainSources(url)
     .then(sources => {
       const promises = sources.map(getArticleData)  
       return Promise.all(promises).then(data => {
         return data
       })
     })
 }

const nnaSources = getSources(href)

export { nnaSources as default }