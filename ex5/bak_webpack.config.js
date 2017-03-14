var config = {
    entry: './src/App.js',

    output: {
        path:'./src/build/',
        filename: 'index.js'
    },

    devServer: {
        inline: true,
        port: 3000
    },

    watchOptions: {
        poll: true
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}

module.exports = config;