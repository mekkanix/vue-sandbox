/**
 * Webpack configuration entrypoint.
 * This script will simply select the right configuration to use
 * depending on the given `mode` option.
 */

const configs = {
  dev: require('./webpack.dev.js'),
  production: require('./webpack.production.js'),
}

module.exports = (_, argv) => {
  const mode = argv.mode && argv.mode === 'production' ? argv.mode : 'development'
  return mode === 'production' ? configs.production : configs.dev
}
