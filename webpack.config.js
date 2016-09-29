var path = require('path');
var webpack = require("webpack");
var config = require('./gulpfile.config').scripts;

module.exports = {
  // Source-Maps zum Debuggen von TypeScript im Browser
  // generieren.
  devtool: 'source-map',
  debug: true,

  // Einstiegspunkt in die Anwendung
  // Erweiterung .js bzw. ts. wird weggelassen
  entry: {
    app: config.app
  },
  // Legt fest, dass das Bundle im Ordner dist abzulegen
  // ist. Der Platzhalter [name] wird durch den Namen des
  // Einstiegspunktes (app) ersetzt.
  output: {
    path: __dirname + "/dist",
    publicPath: config.dest,
    filename: "[name].js",
    pathinfo: true
  },
  // Dateien mit den nachfolgenden Erweiterungen werden
  // von webpack ins Bundle aufgenommen
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.ts']
  },
  // Hier wird der TypeScript-Loader konfiguriert. Er gibt
  // an, dass alle Dateien mit der Endung ts mit diesem Loader
  // zu kompilieren sind. Das Ergebnis dieses Vorgangs wird
  // ins Bundle aufgenommen. Die Eigenschaft test verweist
  // auf einen regulären Ausdruck, der die zu kompilierenden
  // Dateien identifiziert. Die Eigenschaft exclude gibt an,
  // das die Bibliotheken im Ordner node_modules nicht zu
  // kompilieren sind.
  module: {
    loaders: [
        { test: /\.ts$/, loaders: ['ts-loader'], exclude: /node_modules/},

    ]
  },
  plugins: [
    
		new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
    
	]
};
