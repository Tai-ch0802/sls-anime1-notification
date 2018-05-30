'use strict';
const request = require('request')
const cheerio = require('cheerio')

function getListFromAnime1 () {
    var body = request('https://anime1.me/feed', (error, response, body) => {
        const $ = cheerio.load(body)
        let list = []
        
        $('item').each(function(i, elem) {
            list.push($(elem).text().split('\n'))
        })
        console.log(list);
    })
}

function _buildListFromAnime1($) {
    let list = []
        
    $('item').each(function(i, elem) {
        list.push($(elem).text().split('\n'))
    })
    return list
}

module.exports.getListFromAnime1 = getListFromAnime1
