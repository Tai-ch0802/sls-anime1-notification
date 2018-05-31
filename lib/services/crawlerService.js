'use strict'
const request = require('request')
const cheerio = require('cheerio')
const slackService = require('./slackService')
const cache = require('../dynamodb/cache')

module.exports.getListFromAnime1 = getListFromAnime1

function getListFromAnime1 () {
  request('https://anime1.me/feed', (error, response, body) => {
    const $ = cheerio.load(body)

    let list = _buildListFromAnime1($)

    _pushAnime1(list)
  })
}

function _publishNotificationAnime1(list) {
  slackService.publishNotification(
    '#animation',
    'Anime1.me 動畫線上看',
    '最新番來啦！',
    list
  )
}

function _pushAnime1(list) {
  const ANIME1_CACHE = 'anime1-recent-cache'
  var promise = cache.get(ANIME1_CACHE)
  let filterList = []

  promise.then(function(data) {
    const CACHE_VALUE = data.Item.value;

    list.every(function(item, index, arry) {
      if (item.title_link === CACHE_VALUE) {
        return false
      }
      filterList.push(item)
      return true
    });

    if (filterList.length > 0) {
      _publishNotificationAnime1(filterList)
      const NEW_CACHE = filterList[0].title_link
      cache.update(ANIME1_CACHE, NEW_CACHE)
    }
  })

  return filterList
}

function _buildListFromAnime1 ($) {
  const AUTHOR_NAME = 'Anime1.me 動畫線上看'
  const AUTHOR_LINK = 'https://anime1.me/'
  const AUTHOR_ICON = 'https://static.anime1.me/logo/260x260.png'
  const IMAGE = 'https://static.anime1.me/playerImg/5.jpg'
  let list = []
  $('item').each(function (i, elem) {
    list.push($(elem).text().split('\n'))
  })

  list = list.map(list => ({
    'author_name': AUTHOR_NAME,
    'author_link': AUTHOR_LINK,
    'author_icon': AUTHOR_ICON,
    'title': list[1].substring(2),
    'title_link': list[2].substr(2),
    'text': '更新時間：' + list[4].substr(2),
    'image_url': IMAGE
  }))
  return list
}
