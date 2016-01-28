// karma.conf.js
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/*.js',
            'test/*.spec.js'
        ],
        preprocessors: {
            'src/*.js': ['babel', 'coverage'],
            'test/*.js': ['babel']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            reporters: [
                { type: 'text' }
            ]
        },
        singleRun: true,
        browsers: ['Chrome']
    });
};
