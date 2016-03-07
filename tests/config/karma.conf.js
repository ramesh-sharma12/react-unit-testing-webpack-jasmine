var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        basePath: '../../',
        browsers: ['Chrome'], //run in Chrome
        singleRun: false, //just run once by default
        frameworks: ['jasmine'], //use the jasmine test framework
        files: [
         'tests/config/tests.webpack.js'//just load this file
        ],
        preprocessors: {
            'tests/config/tests.webpack.js': ['webpack'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format
        webpack: { //kind of a copy of your webpack config           
            module: {
                loaders: [
                 {
                     test: /\.jsx$/,
                     exclude: /node_modules/,
                     loader: 'babel?presets[]=es2015&presets[]=react'
                 }
                ]
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        coverageReporter: {
            type: 'html', //produces a html document after code is run
            dir: 'coverage/' //path to created html doc
        }
    });
}