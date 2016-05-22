var webpack = require("webpack")

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var cssLoader = ExtractTextPlugin.extract("vue-style", "css?sourceMap!postcss")

var publicPath = "/build/"

var pkg = require('./package.json')
var vendor = Object.keys(pkg.dependencies)

var proxy = {
  "/api/*": {target: "http://python-china.org", host: "python-china.org"},
  "/session*": {target: "http://python-china.org", host: "python-china.org"},
}


module.exports = {
  entry: {
    app: ["./src/ga.js", "./src/index.js", "./lib/css/responsive.css", "./css/index.css"],
    vendor: vendor,
  },

  output: {
    path: __dirname + publicPath,
    filename: 'app.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: function(info) {
      return info.resource;
    }
  },

  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.css$/, loader: cssLoader},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },

  plugins: [
      new ExtractTextPlugin("app.css", {disable: false}),
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
  ],

  postcss: function (pack) {
    return [
      require('postcss-import')({path: './css', addDependencyTo: pack}),
      require('postcss-css-variables'),
    ]
  },

  vue: {
    loaders: {
      css: cssLoader,
    }
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime'],
  },

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: proxy
  },

  devtool: "source-map",
}
