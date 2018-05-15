const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => ({
  entry: "./js/app.js",
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
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([{ from: "static/", to: "../" }])]
})
