const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    console.log (`actively crawling${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error with status code: ${resp.status} on page : ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes( "text/html")){
            console.log(`non html type, content type : ${contentType} on page : ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch(err){
        console.log(`error in fetch ${err.message} from website ${currentURL}`)
    }
    
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