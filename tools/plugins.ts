import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// tslint:disable-next-line:no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import DotenvWebpack from 'dotenv-webpack';

const isDev = process.argv.includes('--dev');
const isProd = process.argv.includes('--prod');

const plugins = [
  new CleanWebpackPlugin(),

  new HtmlWebpackPlugin({
    template: './src/entries/index.html',
    minify: {
      // 是对html文件进行压缩
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true, // 去掉属性的双引号
    },
    hash: true,
  }),

  new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash:8].css',
  }),

  new DotenvWebpack({
    path: `./.env.${isDev ? 'dev' : isProd ? 'prod' : 'uat'}`,
  }),
];

export default plugins;
