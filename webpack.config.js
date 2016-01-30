const path = require('path');
module.exports = {
    entry: './src/calendar',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'build/',
        filename: 'zwl-calendar.js',
        libraryTarget: 'var',
        library: 'zwlCalendar'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
