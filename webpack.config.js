const path = require('path')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // DevServer (local)
  devServer: {
    port: 9000,
    historyApiFallback: {
      index: 'index.html',
    },
    static: [
      {
        directory: path.join(__dirname, 'public'),
        serveIndex: true,
      },
    ],
  },
  // Build configuration (local + lib)
  mode: 'development',
  entry: {
    app: './src/app/main.js',
    lib: './src/lib/main.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@lib': path.resolve(__dirname, 'src/lib/'),
      '@public': path.resolve(__dirname, 'public/'),
    }
  },
  output: {
    library: 'VStool',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'vue-sandbox.[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
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
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
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
      filename: 'vue-sandbox.[name].css',
    }),
    new RemoveEmptyScriptsPlugin(),
    autoprefixer,
  ],
}
