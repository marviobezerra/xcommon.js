import * as webpack from "webpack";
import * as path from "path";
import * as fs from "fs";
import PathHelper from "./webpack.helper";

const pkg = JSON.parse(fs.readFileSync(PathHelper.GetPath("package.json")).toString());

export default {
	entry: {
		"index.umd": PathHelper.GetPath("src", "index.ts"),
		"index.umd.min": PathHelper.GetPath("src", "index.ts"),
	},
	output: {
		path: PathHelper.GetPath("dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		library: "xcommon.js"
	},
	resolve: {
		extensions: [".ts", ".js", ".json"]
	},
	externals: [
		require("webpack-rxjs-externals")(),
		require("webpack-angular-externals")()
	],
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							configFileName: "tsconfig.json"
						}
					},
					{
						loader: "angular2-template-loader"
					}
				],
				exclude: [
					/node_modules/,
					/\.(spec|e2e)\.ts$/
				]
			},

			{
				test: /\.json$/,
				use: "json-loader"
			},

			{
				test: /\.css$/,
				use: ["to-string-loader", "css-loader"]
			},

			{
				test: /\.scss$/,
				use: ["to-string-loader", "css-loader", "sass-loader"]
			},

			{
				test: /\.html$/,
				use: "raw-loader"
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.join(__dirname, "src")
		),

		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			sourceMap: true
		}),

		new webpack.BannerPlugin({
			banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author.name}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
			raw: true,
			entryOnly: true
		})

	]
} as webpack.Configuration;