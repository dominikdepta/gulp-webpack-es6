module.exports = {

    // Entry point is provided in gulp

    output: {
        filename: 'bundle.js'
    },

    devtool: 'source-maps',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}