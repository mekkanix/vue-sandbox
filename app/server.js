/**
 * Main entrypoint for the "server" part of VueSandbox.
 * The tool is provided as a fully-working SPA, so all we need to do here
 * is to serve the main `app` index.html for all routes (except for assets files).
 */

const express = require('express')
const ejs = require('ejs')

// Configuration
const port = 9000
const env = {
  VS_ENV: process.env.VS_ENV,
}
const assets = {
  script: env.VS_ENV === 'production' ? 'vue-sandbox.min.js' : 'vue-sandbox.dev.js',
  style: env.VS_ENV === 'production' ? 'vue-sandbox.min.css' : 'vue-sandbox.dev.css',
}

// Initialization
const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', process.cwd() + '/app/')
app.use(
  '/assets/',
  express.static(process.cwd() + '/app/assets/dist/')
)
app.listen(port, () => {
  console.log(`VueSandbox is running at: http://localhost:${port}`)
})

// Wildcard router for index template file
app.get('/*', (req, res) => {
  res.render('index', {
    assets: assets,
  })
})
