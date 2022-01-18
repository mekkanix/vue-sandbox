const express = require('express')
const router = express.Router()

const App = require('./handlers/App.js')

router.get('/app/meta', (_, res) => {
  const data = App.getMeta()
  res.json(data)
})

module.exports = router
