/**
 * Webpack configuration entrypoint.
 * This script will simply select the right configuration to use
 * depending on the given `mode` option.
 */

const configs = {
  dev: require('./webpack.dev.js'),
  production: require('./webpack.production.js'),
}

module.exports = configs.production
