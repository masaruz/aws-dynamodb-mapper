const uuid = require('uuid/v4')
const assert = require('assert')
const constant = require('./constant.js')
const Schema = require('./schema.js')

describe('Create Module', function() {
    let Account = Schema.model(constant.TABLE_NAME.ACCOUNT, constant.SCHEMA.ACCOUNT)
    let account = new Account({
            AccountId: uuid(), 
            Name: 'stamp', 
            IsActive: true,
            Medals: ['1', '2', '3'],
            Log: {
                LogId: uuid(),
                Timestamp: new Date().getTime(),
                Meta: {
                    Padding: 20,
                    Offset: 50
                }
            },
            Age: 24
        })
    it('check data type', function() {
        let serialized = account.getSerializedData()
        assert.deepEqual(isNaN(serialized.Timestamp.N), false)
        assert.deepEqual(typeof serialized.AccountId.S, 'string')
        assert.deepEqual(typeof serialized.Log.M.LogId.S, 'string')
        assert.deepEqual(typeof serialized.Log.M.Meta.M, 'object')
        assert.deepEqual(isNaN(serialized.Log.M.Meta.M.Padding.N), false)
    })
})
