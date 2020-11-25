module.exports = {
    entry: {
        business: './source/apps/business/index.js',
        customers: './source/apps/customers/index.js',
    }, 
    output: {
        filename: 'scripts/[name].bundle.js', 
        path: __dirname + '/static'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react'], 
                        "plugins": [ "babel-plugin-styled-components"]
                    }
                }
            }, 
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: [
                   {
                     loader: 'url-loader',
                     options: {
                       name:'[hash].[ext]',
                       outputPath: 'images',
                     },
                   },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }       
        ]
    }
}; 