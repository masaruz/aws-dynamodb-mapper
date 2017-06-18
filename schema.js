const Model = require('./model.js')

class Schema {
    /**
     * create model as a new object
     * @param {String} name 
     * @param {JSON} schema 
     */
    static model (name, schema) {
        let _schema = Object.assign({}, {
            id: Number,
            timestamp: Number
        }, schema)
        let parsed = {}

        for (let key in _schema) {
            let type = null
            if (_schema[key] === String)
                type = 'S'
            else if (_schema[key] === Number) 
                type = 'N'
            if (type)
                parsed[key] = type
        }
        return Model.build(name, parsed)
    }
}

module.exports = Schema