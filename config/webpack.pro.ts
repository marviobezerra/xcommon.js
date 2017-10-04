import * as webpack from "webpack";
import PathHelper from "./webpack.helper";
import { AotPlugin } from "@ngtools/webpack";

const workboxPlugin = require('workbox-webpack-plugin');

const Production: webpack.Configuration = {
    entry: {
        "main": PathHelper.GetPath(["src", "main.ts"])
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["@ngtools/webpack"]
            }]
    },
    plugins: [
        new AotPlugin({
            tsConfigPath: PathHelper.GetPath(["tsconfig.json"]),
            mainPath: PathHelper.GetPath(["src", "main.ts"])
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            warnings: false,
            sourceMap: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new workboxPlugin({
            globDirectory: PathHelper.GetPath(["wwwroot"]),
            globPatterns: ['**/*.{html,js,css}'],
            swDest: PathHelper.GetPath(["wwwroot", "sw.js"]),
            minify: true
        })
    ]
};

export default Production;