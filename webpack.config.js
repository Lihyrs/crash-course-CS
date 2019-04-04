const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]

    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080,
        hot: true
    },
    devtool:'inline-source-map'
}