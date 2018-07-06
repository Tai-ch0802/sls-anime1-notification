const should = require('should')
const manhuaguiCronjobList = require('../../lib/dynamodb/manhuaguiCronjobList')
const dateFormat = require('dateformat');

describe('#manhuaguiCronjobList-CRUD', () => {
  it('should be ok when create', done => {
    manhuaguiCronjobList.create(
      '1128',
      'https://tw.manhuagui.com/comic/1128/',
      'https://cf.hamreus.com/cpic/h/1128.jpg',
      '2018-06-29'
    )
    done()
  })
  it('should be ok when get', done => {
    manhuaguiCronjobList.get('1128')
    done()
  })
  it('should be ok when update', done => {
    var date = dateFormat(new Date(), 'yyyy-mm-dd')
    manhuaguiCronjobList.update('1128', date)
    done()
  })
})
