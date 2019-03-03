const path = require("path");

const { ProvidePlugin, DefinePlugin, ProgressPlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        // post css plugins, can be exported to postcss.config.js
                        plugins: () => [
                            require('precss'),
                            require('autoprefixer')
                        ]
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'url-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ],
    },
    plugins: [
        // enable progress bar
        new ProgressPlugin(),

        // provide constant to build
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(argv.mode)
            },
        }),

        // autocreate index.html from template
        new HtmlWebPackPlugin({
            favicon: "./static/favicon.ico",
            title: "Webpack example project",
            template: "./public/index.html",
            filename: "./index.html",
        }),

        // autoclear build folder
        new CleanWebpackPlugin(['dist']),

        // provide libraries as global variables (only transitional solution)
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
});
