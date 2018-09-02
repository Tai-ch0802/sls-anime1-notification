const comic = require('../../lib/dynamodb/comic');
const dateFormat = require('dateformat');

describe('#comic CRUD', () => {
  it('should be ok when create', done => {
    comic.create(
      '1128',
      'https://tw.manhuagui.com/comic/1128/',
      'https://cf.hamreus.com/cpic/h/1128.jpg',
      '2018-06-29'
    )
    done()
  })
  it('should be ok when get', done => {
    comic.get('1128')
    done()
  })
  it('should be ok when update', done => {
    var date = dateFormat(new Date(), 'yyyy-mm-dd')
    comic.update('1128', date)
    done()
  })
  it('should be ok when batchGet', done => {
    comic.batchGet(['1128']);
    done()
  })
})
