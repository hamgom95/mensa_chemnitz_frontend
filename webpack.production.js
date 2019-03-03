const merge = require("webpack-merge");
const { HashedModuleIdsPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

const none = require("./webpack.none");

module.exports = (env, argv) => merge(none(env, argv), {
    output: {
        // hash bundles
        filename: '[name].[chunkhash].js',
    },
    devtool: 'nosources-source-map',
    // save all stats
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    module: {
        rules: [
            // minify css
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },

            // transform / optimize images
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                        },
                    },
                ],
            }
        ],
    },
    optimization: {
        // minify javascript
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    inline: false
                }
            }
        })],
        // split runtime webpack boilerplate in seperate bundle (allows caching)
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                // create seperate vendor bundle containing all dependencies
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
    },
    plugins: [
        // hash minified css
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),

        // avoids new hashes because of module.id change
        new HashedModuleIdsPlugin(),

        // generate service worker
        new GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true
        }),
    ],
});