var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');
// 自动添加css浏览器前缀
var autoprefixer = require('autoprefixer');
// 提取css
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var publicPath = 'http://localhost:3009/';

module.exports = {
    // 输出文件
    output: {
        filename: 'js/[name].js?v=[hash]',
        path: path.join(__dirname, '../client'),
        publicPath: publicPath,
        chunkFilename: 'js/[name].js?v=[hash]'
    },

    resolve: {
        // 定义模块缩写名称
        alias: {
            'global.scss': path.join(__dirname, '../src/assets/scss/global.scss')
        },
        // resolve 指定可以被 import 的文件后缀
        extensions: ['', '.js', '.css', '.scss', '.vue']
    },

    module: {
        // 加载器配置
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            // 提取公共scss
            // loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
            loader: 'style-loader!css-loader!sass-loader!postcss-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader?limit=1000&name=images/[name].[ext]',
            // 添加引用版本号
            query: "v=" + new Date().getTime()
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader?limit=1000&name=images/[name].[ext]',
            // 添加引用版本号
            query: "v=" + new Date().getTime()
        }]
    },
    // postcss配置
    postcss: function() {
        return [autoprefixer]
    },
    // 插件项
    plugins: [

    ]
}
