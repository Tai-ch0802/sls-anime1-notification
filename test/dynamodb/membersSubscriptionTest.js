const dotenv = require('dotenv');
dotenv.config();
const testSupport = require('../support/pause');
const subscriptions = require('../../lib/dynamodb/membersSubscription')
const dateFormat = require('dateformat');

describe('#members subcriptions CRUD', () => {
  it('should be ok when create', done => {
    subscriptions.create(
      'testId',
      '{"value":["123","321"]}}',
      '{"value":["1128"]}}',
      '{"value":["123","321"]}}'
    )

    testSupport.pausecomp(1800);
    done()
  })

  it('should be ok when get', done => {
    subscriptions.get('testId')
    testSupport.pausecomp(1800);
    done()
  })

  it('should be ok when update', done => {
    subscriptions.update(
      'testId',
      '{"value":["123","321"]}}',
      '{"value":["1128"]}}',
      '{"value":["123","456"]}}'
    )
    testSupport.pausecomp(1800);
    done()
  })
})
