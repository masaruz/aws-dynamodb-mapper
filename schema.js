const constant = require('./constant.js')
const Model = require('./model.js')

class Schema {
    /**
     * create model as a new object
     * @param {String} table 
     * @param {JSON} schema 
     */
    static model (table, schema) {
        let _schema = Object.assign({}, constant.SCHEMA.MODEL, schema)
        let parsed = Schema.map(_schema)
        return Model.build(table, parsed)
    }
    static map (_schema) {
        let parsed = {}
        for (let key in _schema) {
            let type = null
            let _type = _schema[key] // String, Number ...
            if (_type === String) type = 'S'
            else if (_type === Number) type = 'N'
            else if (_type === Boolean) type = 'BOOL'
            else if (_type === Array) type = 'L'
            else if (typeof _type === 'object') type = 'M'
            if (type) {
                if (type === 'M') {
                    parsed[key] = {}
                    parsed[key][type] = Schema.map(_type)
                } else {
                    parsed[key] = type
                }
            }
        }
        return parsed
    }
}

module.exports = Schema