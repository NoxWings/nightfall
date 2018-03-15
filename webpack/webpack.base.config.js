const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const FOLDERS = require("./constants").FOLDERS;

module.exports = {
    entry: {
        app: path.join(FOLDERS.SRC, "index.js"),
        engine: [ "babylonjs", "babylonjs-materials", "babylonjs-gui" ]
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
        new CleanWebpackPlugin([ FOLDERS.DIST ], { root: FOLDERS.PROJECT }),
        new CopyWebpackPlugin([{ from: FOLDERS.STATIC, to: FOLDERS.DIST }]),
        new CopyWebpackPlugin([{ from: FOLDERS.ASSETS, to: FOLDERS.DIST_ASSETS, flatten: true }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: "95-100"
            },
            cacheFolder: FOLDERS.CACHE
        }),
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
