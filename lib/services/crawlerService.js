'use strict'
const request = require('request')
const cheerio = require('cheerio')
const slackService = require('./slackService')
const serverlessCrawlerAnimation = require('../dynamodb/serverlessCrawlerAnimation')
const manhuaguiCronjobList = require('../dynamodb/manhuaguiCronjobList')

module.exports.getListFromAnime1 = getListFromAnime1
module.exports.getNewComic = getNewComic

function getNewComic () {
  // const COMIC_LIST = 'manhuagui-cronjob-list';
  const COMIC_LIST = 'testId'
  let promise = serverlessCrawlerAnimation.get(COMIC_LIST)

  promise.then(function (data) {
    const value = data.Item.value
    var json = JSON.parse(value)

    const AUTHOR_NAME = '在線看漫畫_颯漫樂畫_妃夕妍雪 - 看漫畫繁體版'
    const AUTHOR_LINK = 'https://tw.manhuagui.com/'
    const AUTHOR_ICON = 'https://tw.manhuagui.com/images/mhg.png'

    json.list.forEach(function (value) {
      console.log(value)
    });

    // list = list.map(list => ({
    //   'author_name': AUTHOR_NAME,
    //   'author_link': AUTHOR_LINK,
    //   'author_icon': AUTHOR_ICON,
    //   'title': '123123',
    //   'title_link': list.url,
    //   'text': '更新時間：' + list.updated_at,
    //   'image_url': list.image
    // }))

    // slackService.publishNotification(
    //   '#testtt',
    //   'test',
    //   'holyyyyyyy',
    //   list
    // )
  })
}

function getListFromAnime1 () {
  request('https://anime1.me/feed', (error, response, body) => {
    const $ = cheerio.load(body)

    let list = _buildListFromAnime1($)

    _pushAnime1(list)
  })
}

function _pushAnime1 (list) {
  const ANIME1_CACHE = 'anime1-recent-cache'
  var promise = serverlessCrawlerAnimation.get(ANIME1_CACHE)
  let filterList = []

  promise.then(function (data) {
    const CACHE_VALUE = data.Item.value

    list.every(function (item, index, arry) {
      if (item.title_link === CACHE_VALUE) {
        return false
      }
      filterList.push(item)
      return true
    })

    if (filterList.length > 0) {
      slackService.publishNotification(
        '#animation',
        'Anime1.me 動畫線上看',
        '最新番來啦！',
        filterList
      )
      const NEW_CACHE = filterList[0].title_link
      serverlessCrawlerAnimation.update(ANIME1_CACHE, NEW_CACHE)
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
