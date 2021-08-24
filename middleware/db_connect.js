const sqlite3 = require('sqlite3').verbose()
const db_path = './db.sqlite3'

const db_connect = (req, res, next) => {
    let db = new sqlite3.Database(db_path, (err) => {
      if (err) {
        console.error(err.message)
        res.status(500).json({'msg': 'Database error'})
      } else {
        console.log('Connected to the file database.')
        req.db = db
        next()
      }
    })
  }

module.exports = db_connect
