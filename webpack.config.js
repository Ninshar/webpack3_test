var path = require('path');
// css插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清空dist目录插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    context: path.resolve(__dirname, "src"),
    entry:{
        app: path.resolve(__dirname, './src/app.js'),
        home: path.resolve(__dirname,'./src/home/tpl.html'),
        loan: path.resolve(__dirname,'./src/loan/tpl.html'),
        strategy: path.resolve(__dirname,'./src/strategy/tpl.html'),
        personal: path.resolve(__dirname,'./src/personal/tpl.html')
    },
    output:{
        filename: 'js/[name].js',
        path:path.resolve(__dirname, 'dist')
    },
    watch:true,
    // devtool: "cheap-eval-source-map",
    // devtool: "inline-source-map",
    module:{
        rules:[
            // { 
            //     test: /\.js$/, 
            //     exclude: /node_modules/, 
            //     loader: 'babel' 
            // },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            { 
                test: /\.html$/, 
                loader: 'html-loader?interpolate'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,//加载图片
                use: ['file-loader']
            }
        ]
    },
   
    plugins: [
        new CleanWebpackPlugin(['dist']),//清空dist目录插件
        new ExtractTextPlugin("css/[name].css"),//分出css
        // new webpack.optimize.UglifyJsPlugin(),//压缩js
        // new webpack.HotModuleReplacementPlugin(),//热加载

        new HtmlWebpackPlugin({
            title: 'home',
            inject:'body',
            filename: 'view/home.html',
            // 指定html模板
            template: path.resolve(__dirname,'./index.html'),
            chunks: ['app',home]
        }),
        new HtmlWebpackPlugin({//html插件
            title: 'strategy',
            filename: 'view/strategy.html',
            inject:'body',
            // 指定html模板
            template: path.resolve(__dirname,'./index.html'),
            chunks: ['app','strategy'],
            xhtml:true
        }),
        new HtmlWebpackPlugin({
            title: 'loan',
            filename: 'view/loan.html',
            // 指定html模板
            template: path.resolve(__dirname,'./index.html'),
            chunks: ['app','loan']
        }),
        new HtmlWebpackPlugin({
            title: 'personal',
            filename: 'view/personal.html',
            // 指定html模板
            template: path.resolve(__dirname,'./index.html'),
            chunks: ['app','personal']
        })
    ],

}
