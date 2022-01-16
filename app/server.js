/**
 * Main entrypoint for the "server" part of VueSandbox.
 * Because the tool is provided as a fully-working SPA, all we need to do here
 * is to serve the main `app` index.html for all routes (except for assets files).
 */

const express = require('express')
const ejs = require('ejs')

// Configuration
const port = 9000

// Initialization
const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', process.cwd() + '/public/')
app.use(
  express.static(process.cwd() + '/dist/')
)
app.listen(port, () => {
  console.log(`VueSandbox is running at: http://localhost:${port}`)
})

// Route
app.get('/*', (req, res) => {
  res.render('index')
})
