class Model {
    constructor (table, schema, unserialize) {
        this.$__ = {
            schema,
            unserialize,
            serialize: Model.parse(schema, unserialize)
        }
    }
    /**
     * parse normal data format to AWS format
     * @param {JSON} schema 
     * @param {JSON} data 
     */
    static parse (schema, data) {
        let _result = {}
        for (let key1 in data) {
            for (let key2 in schema) {
                if (key1 !== key2) continue
                _result[key1] = {}
                // when it is an object or array
                if (typeof schema[key1] !== 'string') {
                    // recursive assign value with aws type
                    _result[key1]['M'] = Model.parse(schema[key1]['M'], data[key1])
                } else {
                    _result[key1][schema[key1]] = data[key1] + ''
                }
            }
        }
        return _result
    }
    /**
     * merge to base Model
     * @param {String} table 
     * @param {JSON} schema 
     */
    static build (table, schema) {
        return class SubModel extends Model {
            constructor (data) {
                super(table, schema, 
                    Object.assign({}, {
                        Timestamp: new Date().getTime()
                    }, data)
                )
            }
        }
    }
    /**
     * put data to dynamodb
     */
    save () {
        // console.log(this.$__.serialize)
    }

    getSerializedData () {
        return this.$__.serialize
    }
}

module.exports = Model