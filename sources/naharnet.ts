const cheerio = require('cheerio')
const fetch = require('node-fetch')
const moment = require('moment')


const href = 'http://www.naharnet.com/lebanon'

/*
 { title: 'Israel accuses Hezbollah of erecting missile building sites',
    description: 'The claims in the five photographs and 76-second long video could not be independently verified.',
    source: 'Annahar',
    date: '2018-09-08T00:00:00+00:00',
    href: 'https://en.annahar.com/article/870099-israel-accuses-hezbollah-of-erecting-missile-building-sites',
    crawlDate: 'Thu Oct 11 2018 09:25:18 GMT+0000 (UTC)' }
*/


const getMainSources = async url => {
    let sources = []
    let description = []
    let href = []
    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html)
        $('.latest-story a.title').each(function(i, elem) {
            sources[i] = { 'title': ($(this).text()) }
        })
        $('.latest-story').each(function(i, elem) {
            description[i] = { 'description': $(this).children('p').eq(1).text() }
        })
        $('.latest-story a.title').each(function(i, elem) {
            href[i] = ({ 'href': `http://naharnet.com` + $(this).attr('href') })
        })
    }
    catch (err) {
        console.error(err)
    }
    finally {
        return sources.map((source, i) => {
            return {
                title: source.title,
                description: description[i].description,
                source: 'Naharnet',
                href: href[i].href,
                crawlDate: new Date()
            }
        })
    }
}


module.exports = getMainSources(href)

// getMainSources(href).then(data => {
//     console.log(data)
// })
