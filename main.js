const Schema = require('./schema.js')

let Cat = Schema.model('Cat', {name: String})
let cat = new Cat({name: 'tomcat'})

cat.save()