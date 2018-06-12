const should = require('should')
const cache = require('../../lib/dynamodb/cache')

describe('#cache-CRUD', () => {
  it('should be ok when get', done => {
    cache.get('testId')
    done()
  })
})
