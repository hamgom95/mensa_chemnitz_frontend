const path = require("path");
const merge = require("webpack-merge");
const { HotModuleReplacementPlugin } = require("webpack");

const none = require("./webpack.none");
    
module.exports = (env, argv) => merge(none(env, argv), {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            proxy: {
                // proxy urls to backend rest server
                "/api/v1": "https://localhost:3000/api/v1",
                "/oauth": "https://localhost:3000/oauth",
            },
            contentBase: path.resolve(__dirname, 'dist'),
            compress: true,
            // Hot module replacement
            hot: true,
            // self signed ssl
            https: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                      'style-loader',
                      'css-loader?importLoaders=1',
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader'
                    ]
                },
            ],    
        },
        plugins: [
            // enable hot module reload
            new HotModuleReplacementPlugin()
        ],
    });