module.exports = {
    entry: './src/default.js',
    output: {
        path: __dirname + '/public',
        filename: 'default.js',
        libraryTarget: 'var'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/i
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
