import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

const href = 'http://www.naharnet.com/lebanon'

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
        console.log(typeof(response), 'inside getMainSources of Naharnet')
        const html = await response.text().catch((err) => console.error('got you',err))
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
        console.log('ooooooooooooooooooooooppppppss')
    }
    finally {
        console.log('just got into final of naharnet', `sources is ${sources.length}`)
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




const naharnetSources = getMainSources(href).catch(err => console.log(`some bad error here ${err}`))

export {  naharnetSources as default }


