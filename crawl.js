const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedcurrentURl = normalizeURL(currentURL)
    if (pages[normalizedcurrentURl] > 0){
        pages[normalizedcurrentURl]++
        return pages
    }

    pages[normalizedcurrentURl] = 1

    console.log (`actively crawling${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error with status code: ${resp.status} on page : ${currentURL}`)
            return pages 
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes( "text/html")){
            console.log(`non html type, content type : ${contentType} on page : ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch(err){
        console.log(`error in fetch ${err.message} from website ${currentURL}`)
    }
    return pages
    
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            //relative url
            urls.push(`${baseURL}${linkElement.href}`)
        } else {
            //absolute url
             urls.push(linkElement.href)
        }
       
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}