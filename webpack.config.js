var path = require("path"),
	webpack = require("webpack");

module.exports = {
	entry: [
		path.join(__dirname, "test", "core", "index.spec")
	],
	output: {
		path: path.join(__dirname, "test", "runner", "spec"),
		filename: "index.spec.js"
	},
	devtool: "source-map",
	watch: false,
	resolve: {
	    extensions: [".js", ".ts"]
	},

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: "ts-loader"
			},
			{
				test: /\.js$/,
				loader: "strip-sourcemap"
			}
		]
	}
};