const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    module:{
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','resolve-url-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    plugins: [
        //PUG - HTML
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/pug/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "home.html",
            template: './src/pug/home.pug'
        }),
        //SASS - CSS
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        }),
        //JAVASCRIPT
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        //Cleaning dist
        new CleanWebpackPlugin(['dist'])
    ]
};