var path = require('path'),
    webpack = require('webpack');

var _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    context: process.cwd(),
    entry: {
        AngularStuff: [
            '@angular/animations',
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/forms',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/platform-server',
            '@angular/router',

            'hammerjs',
            'ie-shim',
            'reflect-metadata',
            'rxjs',
            'zone.js',
            'core-js',
            'core-js/es6/symbol',
            'core-js/es6/object',
            'core-js/es6/function',
            'core-js/es6/parse-int',
            'core-js/es6/parse-float',
            'core-js/es6/number',
            'core-js/es6/math',
            'core-js/es6/string',
            'core-js/es6/date',
            'core-js/es6/array',
            'core-js/es6/regexp',
            'core-js/es6/map',
            'core-js/es6/set',
            'core-js/es6/weak-map',
            'core-js/es6/weak-set',
            'core-js/es6/typed',
            'core-js/es6/reflect',
            'core-js/es7/reflect',
            'zone.js/dist/zone',
            'ts-helpers'
        ]
    },

    output: {
        filename: '[name].dll.js',
        path: __dirname + '/wwwroot/dist',
        library: '[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join('wwwroot', 'dist', '[name].json')
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            root('./app'), {} // a map of your routes
        ),
    ]
};