const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    output: {
        publicPath: '.',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].[hash].css'
        })
    ]
})
