const dotenv = require('dotenv');
dotenv.config();
const should = require('should');
const service = require('../lib/services/crawlerService');
const testSupport = require('./support/pause');


describe('#get()', () => {
  it('should return the animation list', done => {
    service.getListFromAnime1()
    done()
  })

  it('should return the comic list', done => {
    service.getNewComic();

    testSupport.pausecomp(1900);
    done()
  })
})
