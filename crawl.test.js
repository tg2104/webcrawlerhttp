const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/paths/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing', () => {
    const input = 'https://blog.boot.dev/paths/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/paths'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/paths'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/">
            blog.boot.dev website
            </a >
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "/path/">
            blog.boot.dev website
            </a >
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})