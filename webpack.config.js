var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");

var plugins = [
  new ExtractTextPlugin("style.css", {disable: false})
];

var filename = "qingcheng.js";
var publicPath = "/build/";
if (process.env.PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  // filename = "qingcheng.js";
  // publicPath = "/dist/";
}

module.exports = {
  entry: [
    "./lib/index.js",
    "./lib/css/responsive.css"
  ],

  output: {
    path: __dirname + publicPath,
    filename: filename,
    publicPath: publicPath,
  },

  module: {
    loaders: [
      {
        test: /\.vue$/, loader: vue.withLoaders({
          css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
        }),
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")}
    ]
  },

  plugins: plugins,

  devtool: "#source-map",
};
