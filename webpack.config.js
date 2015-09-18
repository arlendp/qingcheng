var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");

var postcssImport = require('postcss-import');

var webpackPlugins = [
  new ExtractTextPlugin("style.css", {disable: false})
];

var postcssPlugins = [
  require('postcss-custom-properties'),
];

var filename = "qingcheng.js";
var publicPath = "/build/";
if (process.env.PRODUCTION) {
  webpackPlugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: [
    "./lib/index.js",
    "./lib/css/responsive.css",
    "./css/index.css",
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
          css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")
        }),
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")}
    ]
  },

  plugins: webpackPlugins,

  postcss: function () {
    // use webpack context
    postcssPlugins.unshift(postcssImport({
      onImport: function (files) {
        files.forEach(this.addDependency);
      }.bind(this)
    }));
    return postcssPlugins;
  },

  devtool: "#source-map",
};
