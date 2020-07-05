// Init database
// https://github.com/bajankristof/nedb-promises
import Datastore from 'nedb-promises'

let db = Datastore.create({
    filename: 'database.db',
    autoload: true,
    inMemoryOnly: false,
})

// increased productivity, conversion to single-line format
db.persistence.compactDatafile()
db.persistence.setAutocompactionInterval(60 * 1000) // every 1m

export default db