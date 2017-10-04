import * as webpack from "webpack";
import PathHelper from "./webpack.helper";

const DevelopmentConfig: webpack.Configuration = {
    cache: true,
    devtool: "source-map",
    performance: {
        hints: false		
    },
    entry: {
        "main": PathHelper.GetPath(["src", "main.ts"])
    },
    devServer: {
        contentBase: PathHelper.GetPath(['wwwroot']),
        historyApiFallback: true,
        port: 8080,
        
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "awesome-typescript-loader",
                    "angular-router-loader",
                    "angular2-template-loader",
                    "source-map-loader",
                    "tslint-loader"
                ]
            },
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(PathHelper.GetPath(["wwwroot", "dist", "AngularStuff.json"]))
        })
    ]
};

export default DevelopmentConfig;