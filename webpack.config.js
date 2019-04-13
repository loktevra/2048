const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', 
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
