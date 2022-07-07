const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[fullhash:8].js',
        chunkFilename: 'static/js/[name].[fullhash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[fullhash:8].[ext]',
    },
    devServer: {
        liveReload: true,
        // static: resolve('../dist'),
        open: '?className=',
        port: 9527,
        hot: true
    }
})
