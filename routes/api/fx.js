const express = require('express')
const router = express.Router()

router.get('/ohlc/ETHUSD', (req, res) => {
  // Hard code
  res.json({"pair": "ETH/USD", "vwap": 1234.5})
})

module.exports = router
