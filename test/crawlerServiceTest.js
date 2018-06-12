const should = require('should')
const service = require('../lib/services/crawlerService')

describe('#get()', () => {
  it('should return the list', done => {
    service.getListFromAnime1()
    done()
  })
})
