const express = require('express')
const router = express.Router()

const pair_validate = require('../../middleware/pair_validate')
const db_connect = require('../../middleware/db_connect')
const db_disconnect = require('../../middleware/db_disconnect')

router.get('/ohlc/:pair', pair_validate, db_connect, (req, res) => {
  req.db.serialize(() => {
    let sql = `SELECT pair, vwap
      FROM market_price
      WHERE pair = ?
      ORDER BY startTime DESC`
    req.db.get(sql, [req.pair], (err, row) => {
      if (err) {
        console.error(err.message)
        res.status(404).json({'msg': 'Data not found'})
      } else {
        console.log(row)
        res.json(row)
      }
    })
  })
}, db_disconnect)

router.get('/ohlc/:pair/history', pair_validate, db_connect, (req, res) => {
  req.db.serialize(() => {
    let sql = `SELECT ? AS pair, DATE(startTime, 'unixepoch') AS date
      , MAX(high) AS maxHigh, MIN(low) AS minLow
      FROM market_price
      WHERE pair = ?
      GROUP BY date
      ORDER BY startTime ASC`
    req.db.all(sql, [req.pair, req.pair], (err, rows) => {
      if (err) {
        console.error(err.message)
        res.status(404).json({'msg': 'Data not found'})
      } else {
        console.log(rows)
        let out = []
        rows.forEach(row => {
          out.push(Object.values(row))
        });
        res.json(out)
      }
    })
  })
}, db_disconnect)

module.exports = router
