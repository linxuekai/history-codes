'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // WS_URL: '"wss://ws.laex.pro"',
  WS_URL: '"ws://116.25.107.90:15449"',
  isDev: 'true',
})
