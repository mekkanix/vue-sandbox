const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const NodemonPlugin = require('nodemon-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: './app/ui/main.js',
  output: {
    library: 'VS',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, './app/ui/assets/dist/'),
    publicPath: '/',
    filename: 'vue-sandbox.dev.js',
  },
  module: {
    rules: [
      // Pkg-related rules (internal)
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
        exclude: [
          path.join(__dirname, 'public/components/')
        ],
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
                  path.join(__dirname, 'app/assets/sass'),
                ]
              },
            },
          },
        ]
      },
      // User-provided components-related rules
      {
        test: /\.s[ac]ss$/i,
        exclude: [
          path.join(__dirname, 'app/')
        ],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.join(__dirname, 'app/assets/sass'),
                ]
              },
            },
          },
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'app/ui/'),
      '@server': path.resolve(__dirname, 'app/server/'),
      '@public': path.resolve(__dirname, 'public/'),
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-sandbox.dev.css',
    }),
    new RemoveEmptyScriptsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 9001,
      generateStatsFile: true,
      openAnalyzer: false,
    }),
    // new NodemonPlugin({
    //   script: './app/server/main.js',
    //   watch: path.resolve('./app/server/'),
    //   env: {
    //     VS_ENV: 'development',
    //   }
    // }),
  ],
}
