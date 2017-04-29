var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {
    cache: true,
    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'angular': './src/angular/index.ts',
        'core': './src/core/index.ts',
        'test': './test/index.spec.ts',
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
                loaders: [
                    'awesome-typescript-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\layout.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|layout.scss)/,
                loaders: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new ExtractTextPlugin('dist/layout.css'),
        new CleanWebpackPlugin(
            [
                './wwwroot/*'
            ]
        ),
        new CopyWebpackPlugin([{
            from: './test/runner',
            to: './test/'
        }]),
        new HtmlWebpackPlugin({
            filename: '../index.html',
        })
    ]
};