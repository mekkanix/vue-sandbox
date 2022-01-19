const express = require('express')
const router = express.Router()
// Handlers
const App = require('./api/handlers/App.js')
const Public = require('./api/handlers/Public.js')

// Routes
router.get('/app/meta', App.getMeta)
router.get('/public/components', Public.getComponents)

module.exports = router
