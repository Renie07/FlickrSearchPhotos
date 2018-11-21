const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports =  {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss'
    ],

    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'public')
    },

    watch: true,
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [require('babel-plugin-syntax-async-functions'), require('babel-plugin-transform-runtime')]
                    }
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: true,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 10', 'last 2 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.css',
            allChunks: true,
        })
    ]
};