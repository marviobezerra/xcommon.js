import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import PathHelper from "./webpack.helper";

const autoprefixer = require("autoprefixer");

const CommonConfig: webpack.Configuration = {
	entry: {
		polyfills: PathHelper.GetPath(["src", "polyfills.ts"]),
		vendor: PathHelper.GetPath(["src", "vendor.ts"]),
		sytles: PathHelper.GetPath(["src", "styles", "app-style.scss"])
	},
	output: {
		path: PathHelper.GetPath(["wwwroot"]),
		filename: "dist/[name].js",
		chunkFilename: "dist/[name].[id].chunk.js",
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
				use: ["file-loader?name=assets/[name].[ext]"]
			},
			{
				test: /\app-style.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "postcss-loader",
						options: {
							plugins: [autoprefixer()]
						}
					}, "sass-loader"]
				})
			},
			{
				test: /\.scss$/,
				exclude: /\app-style.scss$/,
				use: ["raw-loader", {
					loader: "postcss-loader",
					options: {
						plugins: [autoprefixer({
						})]
					}
				}, "sass-loader"]
			},
			{
				test: /\.html$/,
				exclude: /\index.html$/,
				use: ["raw-loader"]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({ names: ["vendor", "polyfills"] }),
		new ExtractTextPlugin("dist/styles.css"),
		new HtmlWebpackPlugin({
			title: "My Pet Life",
			filename: "index.html",
			inject: "body",
			template: "src/index.html",
			production: process.argv.indexOf("pro") !== -1,
			minify: {
				removeAttributeQuotes: false,
				collapseWhitespace: true,
				minifyCSS: true,
				removeComments: true,
				removeEmptyAttributes: false
			}
		})
	]
};

export default CommonConfig;