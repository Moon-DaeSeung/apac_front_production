const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

module.exports = {
  mode: mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader']
    }, {
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      templateParameters: {
        env: mode === 'production' ? '' : '[DEV]'
      },
      minify: mode === 'production' ? { collapseWhitespace: true, removeComments: true } : false
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
}
