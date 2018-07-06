const dotenv = require('dotenv')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config()

module.exports.getEnvVars = () => ({
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  SLASH_TOKEN_SECRETARY: process.env.SLASH_TOKEN_SECRETARY,
  DYNAMODB_ANIMATION_TABLE: process.env.DYNAMODB_ANIMATION_TABLE,
  DYNAMODB_COMIC_TABLE: process.env.DYNAMODB_COMIC_TABLE,
})
