var webpack = require("webpack");
var vue = require("vue-loader");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssLoader = ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader");

var webpackPlugins = [
  new ExtractTextPlugin("style.css", {disable: false})
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
      {test: /\.vue$/, loader: vue.withLoaders({css: cssLoader})},
      {test: /\.css$/, loader: cssLoader},
    ]
  },

  plugins: webpackPlugins,

  postcss: function () {
    // use webpack context
    var postcssImport = require('postcss-import');

    return [
      postcssImport({
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),

      require('postcss-custom-properties'),
    ]
  },

  devtool: "#source-map",
};
