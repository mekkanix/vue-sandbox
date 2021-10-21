const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    library: 'VueSandbox',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, './dist/'),
    publicPath: path.resolve(__dirname, './dist/'),
    filename: 'vue-sandbox.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            }
          },
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
