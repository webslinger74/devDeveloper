var webpack = require('webpack');
var path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(common, {
   devtool: 'source-map',
    mode: 'production',
    plugins:[
        new CleanWebpackPlugin(['build'])
    ]
  
});

