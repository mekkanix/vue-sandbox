const express = require('express')
const router = express.Router()
// Handlers
const App = require('./api/handlers/App.js')

// Routes
router.get('/app/meta', App.getMeta)

module.exports = router
