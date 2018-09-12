var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, './src/index.js')],
    output:{
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath:'/'
    },
    plugins: [
        new htmlWebpackPlugin({
        template:'index.html',
      filename:'index.html',
    inject: 'body'
    })
   ], 
  
   module: {
    rules: [
        {
            test: /.js?$/,
            loader:'babel-loader',
            exclude: /node_modules/
        },
        {
           test: /\.css$/,
                    use: [
                       'style-loader',
                       'css-loader',
                       'resolve-url-loader'
                     ]
                   },
                    {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                      {
                        loader:'url-loader',
                        options: {
                          
                        }
                      }
                    ]
                  }       
    ]
}     
    
}