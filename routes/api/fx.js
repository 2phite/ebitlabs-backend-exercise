const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db_path = './db.sqlite3'

router.get('/ohlc/ETHUSD', (req, res) => {
  let db = new sqlite3.Database(db_path, (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the file database.')

    db.serialize(() => {
      let sql = `SELECT pair, vwap
        FROM market_price
        WHERE pair = 'ETH/USD'
        ORDER BY startTime DESC`
      db.get(sql, [], (err, row) => {
        if (err) {
          console.error(err.message)
          res.status(404)
          res.json({'msg': 'Data not found'})
        } else {
          console.log(row)
          res.json(row)
        }
      })
    })

    db.close((err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Close the database connection.')
    })
  })
})

module.exports = router
