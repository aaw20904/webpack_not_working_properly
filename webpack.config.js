const path= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname,"dist")
    },

    plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            chunks:["index"],
            filename:"index.html",
            template:"./src/index.html"
        })
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /(rsp_)\w+.(jpg)$/i,
            use: {
              loader: "responsive-loader",
              options:{
                  name:"./img/[name][width].[ext]"
              }
            },
          },
        ],
      },

      optimization: {
        runtimeChunk: 'single',
          minimize: true,
          minimizer: [
            new CssMinimizerPlugin(), 
            new TerserPlugin(),
          ],
  
      },
  
      devServer:{
          allowedHosts: 'all',
          port: 9000,
          hot:true,
      },
}