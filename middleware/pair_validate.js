const pair_dict = {'ETHGBP': 'ETH/GBP', 'ETHUSD': 'ETH/USD'}

const pair_validate = (req, res, next) => {
    if (pair_dict[req.params.pair]) {
      console.log(pair_dict[req.params.pair])
      req.pair = pair_dict[req.params.pair]
      next()
    } else {
      console.log('Pair name not found')
      res.status(404).json({'msg': 'Pair name not found'})
    }
  }

module.exports = pair_validate
