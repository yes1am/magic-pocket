const path = require('path')
const baseConfig = require('./base')

module.exports = Object.assign({
  mode: 'production',
  entry: {
    app: './app/views/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets',
    filename: '[name].js'
  }
}, baseConfig.pro)
