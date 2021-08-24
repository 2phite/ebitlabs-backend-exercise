const db_disconnect = (req, res, next) => {
    req.db.close((err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Close the database connection.')
    })
  }

module.exports = db_disconnect
