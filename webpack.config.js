const path = require('path')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env, argv) => {

  const mode = argv.mode && argv.mode === 'production' ? argv.mode : 'development'
  const scriptFilename = mode === 'production' ? 'vue-sandbox.min.js' : 'vue-sandbox.js'
  const styleFilename = mode === 'production' ? 'vue-sandbox.min.css' : 'vue-sandbox.css'

  const config = {
    // Build configuration (local)
    mode: mode,
    entry: './app/main.js',
    output: {
      library: 'VS',
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.resolve(__dirname, './app/assets/dist/'),
      publicPath: '/',
      filename: scriptFilename,
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
        '@': path.resolve(__dirname, 'app/'),
        '@public': path.resolve(__dirname, 'public/'),
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: styleFilename,
      }),
      new RemoveEmptyScriptsPlugin(),
    ],
  }

  if (mode === 'production') {
    config.optimization = {
      minimizer: [
        new TerserPlugin(),
        new CSSMinimizerPlugin(),
      ]
    }
    config.plugins.push(autoprefixer)
  }

  if (mode === 'development') {
    const analyzerPluginConfig = new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 9001,
      generateStatsFile: true,
      openAnalyzer: false,
    })
    const nodemonPluginConfig = new NodemonPlugin({
      script: './app/server.js',
      watch: path.resolve('./app/server.js'),
      env: {
        VS_ENV: 'development',
      }
    })
    config.plugins.push(analyzerPluginConfig)
    config.plugins.push(nodemonPluginConfig)
  }

  return config

}
