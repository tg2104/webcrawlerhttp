const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://boot.dev/paths/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing', () => {
    const input = 'https://boot.dev/paths/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BOOT.dev/paths'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/paths'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://boot.dev/paths'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/paths'
    expect(actual).toEqual(expected)
})