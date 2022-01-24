/**
 * Main entrypoint for the "server" part of VueSandbox.
 * The tool is provided as a fully-working SPA, so all we need to do here
 * is to serve the main `app` index.html for all routes (except for assets files).
 */

require('module-alias/register')
const App = require('./core/App')

console.log(process.argv);

// Configuration
const ENV = process.env.VS_ENV
const root = process.cwd()

const conf = {
  env: ENV,
  port: 9000,
  rootDir: root,
  static: {
    scriptFilename: ENV === 'production' ? 'vue-sandbox.min.js' : 'vue-sandbox.dev.js',
    styleFilename: ENV === 'production' ? 'vue-sandbox.min.css' : 'vue-sandbox.dev.css',
  },
  public: {
    componentsDir: `${root}/public/components`,
    // assetsDir: `${root}/public/assets`,
  },
}

// Bootstrapping
const app = new App(conf)
// app.start()
