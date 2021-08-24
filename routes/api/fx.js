const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db_path = './db.sqlite3'
const pair_dict = {'ETHGBP': 'ETH/GBP', 'ETHUSD': 'ETH/USD'}

router.get('/ohlc/:pair', (req, res) => {
  let pair = undefined
  if (pair_dict[req.params.pair]) {
    console.log(pair_dict[req.params.pair])
    pair = pair_dict[req.params.pair]
  } else {
    console.log('Pair name not found')
    res.status(404)
    res.json({'msg': 'Pair name not found'})
    return
  }

  let db = new sqlite3.Database(db_path, (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the file database.')

    db.serialize(() => {
      let sql = `SELECT pair, vwap
        FROM market_price
        WHERE pair = ?
        ORDER BY startTime DESC`
      db.get(sql, [pair], (err, row) => {
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
