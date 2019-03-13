const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        base: { // 抽离自己写的公共代码，base这个名字可以随意起
          test: /\.js$/,
          chunks: 'initial',
          name: 'base',  // 任意命名
          filename: 'js/base.js',
          minSize: 0    // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      utils: path.resolve(__dirname, 'src/utils'),
      service: path.resolve(__dirname, 'src/service'),
      component: path.resolve(__dirname, 'src/component')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|woff|svg|ttf|eot|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: '8866',
    open: true,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}