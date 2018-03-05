const merge = require("webpack-merge");
const baseConf = require("./webpack.base.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseConf, {
    plugins: [
        new UglifyJsPlugin()
    ]
});
