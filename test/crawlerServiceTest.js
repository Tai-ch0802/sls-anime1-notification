const should = require('should')
const service = require('../lib/services/crawlerService')

describe('#get()', () => {
  it('should return the list', done => {
    var list = service.getListFromAnime1()
    done()
  })
})
