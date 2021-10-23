const path = require('path')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // DevServer
  devServer: {
    port: 9000,
    static: [
      {
        directory: path.join(__dirname, 'public')
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/assets'
      },
    ],
  },
  // Build
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
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.join(__dirname, 'src/assets/sass'),
                ]
              },
            },
          },
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CSSMinimizerPlugin(),
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-sandbox.css',
    }),
    new RemoveEmptyScriptsPlugin(),
    autoprefixer,
  ],
}
