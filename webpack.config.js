var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    autoprefixer = require("autoprefixer");

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {
    cache: true,
    devtool: 'eval-source-map',
    performance: {
        hints: false
    },
    entry: {
        'polyfills': './demo/polyfills.ts',
        'vendor': './demo/vendor.ts',
        'main': './demo/main.ts',
        'app-style': './demo/styles/app-style.scss',
        // Lib
        'angular': './src/angular/index.ts',
        'core': './src/core/index.ts',
        'test': './src/index.spec.ts',
        'layout': './src/style/layout.scss'
    },
    output: {
        path: path.join(__dirname, '/wwwroot/'),
        filename: 'dist/[name].js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/wwwroot/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                exclude: /(node_modules|app)$/,
                test: /(app-style.scss|layout.scss)$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader'] })
            },
            {
                exclude: /(node_modules|layout.scss|app-style.scss)$/,
                test: /\.scss$/,
                use: ['to-string-loader', 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(path.join(__dirname, 'wwwroot', 'dist', 'AngularStuff.json'))
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'] }),
        new ExtractTextPlugin('dist/[name].css'),
        new CopyWebpackPlugin([{
            from: './test/runner',
            to: './test/'
        }]),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer
                ]
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'demo/index.html',
            excludeChunks: [
                'angular',
                'core',
                'test',
                'layout'
            ]
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve('./wwwroot/dist/AngularStuff.dll.js'),
            includeSourcemap: false
        })
    ]
};