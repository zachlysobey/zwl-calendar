const webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'test/*.spec.js'
        ],
        preprocessors: {
            'test/*.spec.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['spec'],
        autoWatch: false,
        singleRun: true,
        browsers: ['Chrome']
    });
};
