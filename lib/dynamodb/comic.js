'use strict'

const dotenv = require('dotenv')
dotenv.config()
const AWS = require('aws-sdk')
AWS.config.update({region: process.env.REGION})
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

module.exports.create = create
module.exports.get = get
module.exports.update = update
module.exports.batchGet = batchGet

function create (id, url, image, updatedAt, callback) {
  const params = {
    TableName: process.env.DYNAMODB_COMIC_TABLE,
    Item: {
      id: id,
      url: url,
      image: image,
      updatedAt: updatedAt,
      enable: true
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

function batchGet (ids) {
  const DYNAMODB_COMIC_TABLE  = process.env.DYNAMODB_COMIC_TABLE;
  var params = {
    RequestItems: {}
  };
  params.RequestItems[DYNAMODB_COMIC_TABLE] = {};

  var keys = ids.map((id) => ({
    id: id,
  }));

  params.RequestItems[DYNAMODB_COMIC_TABLE].Keys = keys;

  return dynamoDBClient.batchGet(params).promise();
}

function get (id, callback) {
  const params = {
    TableName: process.env.DYNAMODB_COMIC_TABLE,
    Key: {
      id: id
    }
  }
  return dynamoDBClient.get(params, callback)
}

function update (id, updatedAt, callback) {
  const params = {
    TableName: process.env.DYNAMODB_COMIC_TABLE,
    Key: {
      id: id
    },
    ExpressionAttributeNames: {
      '#todo_updatedAt': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':updatedAt': updatedAt
    },
    UpdateExpression: 'SET #todo_updatedAt = :updatedAt',
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
