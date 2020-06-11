'use strict';

var webpack = require('webpack');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'es6-shim.js',
            'node_modules/sinon/pkg/sinon.js',
            'src/spec/**/*Spec.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/spec/**/*Spec.js': ['webpack'],
        },

        // webpack preprocessor
        webpack: {
            mode: 'development',

            plugins: [
                new webpack.LoaderOptionsPlugin({
                    options: {
                        eslint: {
                            failOnError: true
                        }
                    }
                })
            ],
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'eslint-loader',
                        enforce: 'pre'
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env',]
                        }
                    }
                ]
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit'],

        // jUnit reporter
        junitReporter: {
            outputDir: 'reports',
            outputFile: 'junit_karma.xml',
            suite: ''
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        // to test with Chromium:
        // CHROME_BIN=/usr/bin/chromium-browser karma start --single-run
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        browserNoActivityTimeout: 100000

    });
};
