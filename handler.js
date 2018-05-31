'use strict'

module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*' // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
    })
  }

  callback(null, response)
}

module.exports.publishNotificationFromAnime1 = (event, context, callback) => {
  const crawlerService = require('./lib/services/crawlerService');

  crawlerService.getListFromAnime1();
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*' // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Publish notification from Anime1 successfully!',
    })
  }

  callback(null, response)
}
