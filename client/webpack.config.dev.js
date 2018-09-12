var webpack = require('webpack');
var path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');




module.exports = merge(common, {
    mode:'development',
   devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        port:8080,
        historyApiFallback:true,   //this ensures the site goes back to root to load react router from home page
        proxy: {
            "/api/users/register" :{
                target:"http://localhost:3000", 
                secure:"false" 
             },
            "/api/**/**" :{
                target:"http://localhost:3000",
                secure:"false"
            },
            "/api/profile/handle/**" : {
                target:"http://localhost:3000",
                secure:"false"
            }
           
          }

    }
   
})