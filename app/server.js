/**
 * Main entrypoint for the "server" part of VueSandbox.
 * The tool is provided as a fully-working SPA, so all we need to do here
 * is to serve the main `app` index.html for all routes (except for assets files).
 */

const yargsParser = require('yargs-parser')
const express = require('express')
const ejs = require('ejs')

// Configuration
// TODO: Remove this CLI args parsing from server entrypoint, by using
// a dedicated binary script to manage on-the-fly VS setup.
const argv = yargsParser(process.argv.slice(2))
const port = 9000
const env = {
  VS_ENV: process.env.VS_ENV,
}
const assetsPrefix = argv.assetsPrefix || null
const assets = {
  script: env.VS_ENV === 'production' ? 'vue-sandbox.min.js' : 'vue-sandbox.dev.js',
  style: env.VS_ENV === 'production' ? 'vue-sandbox.min.css' : 'vue-sandbox.dev.css',
}
console.log(assetsPrefix);

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
  console.log(`\r\n[VueSandbox] Program started.`)
  console.log(`[VueSandbox] Host: http://localhost:${port}`)
})

// Wildcard router for index template file
app.get('/*', (req, res) => {
  res.render('index', {
    assets: assets,
  })
})
