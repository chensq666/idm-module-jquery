const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = (dir) => path.resolve(__dirname, dir)
const uuidCharts = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
const isDev = process.env.NODE_ENV === 'development'
const getGUID = function (len, radix) {
    var chars = uuidCharts,
        uuid = [],
        i
    radix = radix || chars.length
    len = len || 16
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16)
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}
module.exports = {
    entry: {
        index: resolve('../src/index.js')
    },
    output: {
        path: resolve('../dist'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[ext]',
        chunkLoadingGlobal: JSON.stringify('webpackJsonp_' + getGUID() + '_' + new Date().getTime())
    },
    resolveLoader: {
        alias: {
            'template-loader': resolve('./loader/customHtmlTemplateLoader.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve('../src'),
                loader: require.resolve('babel-loader')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDev
                        ? 'style-loader'
                        : {
                              loader: MiniCssExtractPlugin.loader
                          },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|audio|mp4)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /\.html$/,
                include: resolve('../src/components/template'),
                use: ['template-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: 'head',
            template: resolve('../public/index.html')
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve('../public'),
                    filter(file) {
                        if (file.indexOf('index.html') > -1) return false
                        return true
                    }
                }
            ]
        })
    ],
    stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        colors: true,
        depth: false,
        entrypoints: true,
        hash: false,
        modules: false,
        performance: true,
        reasons: false,
        source: false,
        timings: true,
        version: false,
        warnings: true
    }
}
