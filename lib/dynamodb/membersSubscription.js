'use strict'

const dotenv = require('dotenv')
dotenv.config()
const AWS = require('aws-sdk')
AWS.config.update({region: process.env.REGION})
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

module.exports.create = create;
module.exports.get = get;
module.exports.update = update;
module.exports.getAllComic = getAllComic;

function create (id, anime1, comic, twitch, callback) {
  const timestamp = new Date().getTime()
  const params = {
    TableName: process.env.DYNAMODB_SUBSCRIPTION_TABLE,
    Item: {
      user_id: id,
      anime1: anime1,
      comic: comic,
      twitch: twitch
    }
  }

  dynamoDBClient.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback({
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.'
      })
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(response)
  })
}

function get (id) {
  const params = {
    TableName: process.env.DYNAMODB_SUBSCRIPTION_TABLE,
    Key: {
      user_id: id
    }
  }

  var promise = dynamoDBClient.get(params).promise()
  return promise
}

function update (user_id, anime1, comic, twitch, callback) {
  const params = {
    TableName: process.env.DYNAMODB_SUBSCRIPTION_TABLE,
    Key: {
      user_id: user_id
    },
    ExpressionAttributeNames: {
      '#todo_anime1': 'anime1',
      '#todo_comic': 'comic',
      '#todo_twitch': 'twitch',
    },
    ExpressionAttributeValues: {
      ':anime1': anime1,
      ':comic': comic,
      ':twitch': twitch
    },
    UpdateExpression: 'SET #todo_anime1 = :anime1, #todo_comic = :comic, #todo_twitch = :twitch',
    ReturnValues: 'ALL_NEW'
  }

  // update the todo in the database
  dynamoDBClient.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.'
      })
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    }
    callback(null, response)
  })  
}

function getAllComic () {
  const DYNAMODB_SUBSCRIPTION_TABLE  = process.env.DYNAMODB_SUBSCRIPTION_TABLE;
  var params = {
    RequestItems: {}
  };
  params.RequestItems[DYNAMODB_SUBSCRIPTION_TABLE] = {};

  var keys = [{user_id: 'all_test'}];

  params.RequestItems[DYNAMODB_SUBSCRIPTION_TABLE].Keys = keys;

  return dynamoDBClient.batchGet(params).promise();
}
