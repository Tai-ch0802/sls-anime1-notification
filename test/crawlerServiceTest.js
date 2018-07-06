const should = require('should')
const service = require('../lib/services/crawlerService')

describe('#get()', () => {
  it('should return the animation list', done => {
    service.getListFromAnime1()
    done()
  })

  it('should return the comic list', done => {
    service.getNewComic()
    done()
  })
})
