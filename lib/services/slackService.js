var Slack = require('slack-node')
const dotenv = require('dotenv')
dotenv.config()

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
slack = new Slack()
slack.setWebhook(SLACK_WEBHOOK_URL)

function publishNotification (channel, username, text, attachments) {
  slack.webhook({
    channel: channel,
    username: username,
    text: text,
    attachments: attachments
  }, function (err, response) {
    console.log(response)
  })
}

module.exports.publishNotification = publishNotification
