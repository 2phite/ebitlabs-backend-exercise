const express = require('express')
const app = express()
const port = 3000

// FX API routes
app.use('/api/fx', require('./routes/api/fx'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
