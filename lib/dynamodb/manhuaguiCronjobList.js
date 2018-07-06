'use strict'

const dotenv = require('dotenv')
dotenv.config()
const AWS = require('aws-sdk')
AWS.config.update({region: process.env.REGION})
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = create
module.exports.get = get
module.exports.update = update

function create (id, url, image, updatedAt, callback) {
  const params = {
    TableName: process.env.DYNAMODB_COMIC_TABLE,
    Item: {
      id: id,
      url: url,
      image: image,
      updatedAt: updatedAt
    }
  }

  dynamoDb.put(params, (error) => {
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
    TableName: process.env.DYNAMODB_COMIC_TABLE,
    Key: {
      id: id
    }
  }

  var promise = dynamoDb.get(params).promise()
  return promise
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
  dynamoDb.update(params, (error, result) => {
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
