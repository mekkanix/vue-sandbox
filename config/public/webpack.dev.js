const path = require('path')
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
// const NodemonPlugin = require('nodemon-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
  mode: 'development',
  // entry: componentsEntries,
  output: {
    hashFunction: 'xxhash64',
    library: 'VSPC__[name]', // -> VSPC = VueSandbox Public Component
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: `${process.cwd()}/public/user/_build/`,
    publicPath: '/',
    filename: '[name].dev.js',
  },
  module: {
    rules: [
      // SFC files
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      // JS scripts
      {
        test: /\.js$/i,
        loader: 'babel-loader',
      },
      // Native CSS
      {
        test: /\.css$/i,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      // // SASS/SCSS
      // {
      //   test: /\.s[ac]ss$/i,
      //   exclude: [
      //     path.join(__dirname, 'app/')
      //   ],
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sassOptions: {
      //           indentedSyntax: true,
      //           includePaths: [
      //             path.resolve(__dirname, 'node_modules'),
      //             path.join(__dirname, 'app/assets/sass'),
      //           ]
      //         },
      //       },
      //     },
      //   ]
      // }
    ]
  },
  // resolve: {
  //   alias: {
  //     '@ui': path.resolve(__dirname, 'app/ui/'),
  //     '@server': path.resolve(__dirname, 'app/server/'),
  //     '@public': path.resolve(__dirname, 'public/'),
  //   }
  // },
  plugins: [
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].dev.css',
    // }),
    // new RemoveEmptyScriptsPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerPort: 9001,
    //   generateStatsFile: true,
    //   openAnalyzer: false,
    // }),
    // new NodemonPlugin({
    //   script: './app/server/main.js',
    //   watch: path.resolve('./app/server/'),
    //   env: {
    //     VS_ENV: 'development',
    //   }
    // }),
  ],
}
