import * as cheerio from 'cheerio'
import fetch from 'node-fetch'



const href = 'http://www.naharnet.com/lebanon'

/*
 { title: 'Israel accuses Hezbollah of erecting missile building sites',
    description: 'The claims in the five photographs and 76-second long video could not be independently verified.',
    source: 'Annahar',
    date: '2018-09-08T00:00:00+00:00',
    href: 'https://en.annahar.com/article/870099-israel-accuses-hezbollah-of-erecting-missile-building-sites',
    crawlDate: 'Thu Oct 11 2018 09:25:18 GMT+0000 (UTC)' }
*/

interface Href {
    href: string
}

interface Description {
    description: string
}

interface Source {
    title: string
}

const getMainSources = async (url: string) => {
    let sources: Array<Source> = []
    let description: Array<Description> = []
    let href: Array<Href> = []
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
                date: new Date()
            }
        })
    }
}




const naharnetSources = getMainSources(href)

export {  naharnetSources as default }

getMainSources(href).then(data => {
    console.log(data)
})
