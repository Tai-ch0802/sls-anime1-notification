const should = require('should')
const cache = require('../../lib/dynamodb/cache')

describe('#cache-CRUD', () => {
//   it('should be ok when create', done => {
//     cache.create('testId', 'testValue')
//     done()
//   })

//   it('should be ok when update', done => {
//     cache.update('testId', 'testValueAfterUpdate')
//     done()
//   })

  it('should be ok when get', done => {
    cache.get('testId')
    done()
  })
})
