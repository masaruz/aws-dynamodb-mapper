
class Model {
    constructor (name, schema, unserialize) {
        this.$__ = {
            schema: schema,
            unserialize: unserialize,
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
                _result[key1][schema[key1]] = data[key1]
            }
        }
        return _result
    }
    /**
     * merge to base Model
     * @param {String} name 
     * @param {JSON} schema 
     */
    static build (name, schema) {
        return class SubModel extends Model {
            constructor (data) {
                super(name, schema, 
                    Object.assign({}, {
                        id: 1234,
                        timestamp: new Date().getTime()
                    }, data)
                )
            }
        }
    }
    /**
     * put data to dynamodb
     */
    save () {
        console.log(this.$__.serialize)
    }
}

module.exports = Model