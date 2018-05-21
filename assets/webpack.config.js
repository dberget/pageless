const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = (env, argv) => ({
  entry: ["babel-polyfill", "./js/app.js"],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../priv/static/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: { loader: "css-loader" }
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("../css/app.css")]
})
