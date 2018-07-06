const should = require('should')
const serverlessCrawlerAnimation = require('../../lib/dynamodb/serverlessCrawlerAnimation')

describe('#serverlessCrawlerAnimation-CRUD', () => {
  it('should be ok when get', done => {
    serverlessCrawlerAnimation.get('testId')
    done()
  })
  it('should be ok when update', done => {
    serverlessCrawlerAnimation.update('testId', '{"list":["1128"]}')
    done()
  })
})
