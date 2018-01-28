const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FOLDERS = require("./constants").FOLDERS;

module.exports = {
    entry: {
        app: path.join(FOLDERS.SRC, "index.js"),
        engine: [ "babylonjs" ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["transform-runtime"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([ FOLDERS.DIST ]),
        new CopyWebpackPlugin([{ from: FOLDERS.STATIC, to: FOLDERS.DIST }]),
        new CopyWebpackPlugin([{ from: FOLDERS.ASSETS, to: FOLDERS.DIST_ASSETS, flatten: true }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "engine",
            minChunks: Infinity,
        })
    ],
    output: {
        filename: "[name].js",
        path: FOLDERS.DIST
    }
};
