const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const autoprefixer = require('autoprefixer');

const baseConfig = {
  entry: './src/index.tsx',
  output: {
    filename: '[name]-[hash:6].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers:['ie >= 8', 'last 4 version']
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['src/**/*'],
              sourceMap: true
            }
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      title: '2048',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        { path: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', type: 'css' },
      ],
      append: true
    }),
  ]
}

const prodConfig = {
  plugins: [
    new MiniCssExtractPlugin(),
  ],
}

module.exports = (env, { mode }) => {
  if (mode == 'production') {
    return merge(baseConfig, prodConfig)
  }

  return baseConfig
};
