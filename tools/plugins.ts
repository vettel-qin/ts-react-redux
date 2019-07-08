import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const plugins = [
  new CleanWebpackPlugin(),

  new HtmlWebpackPlugin({
    template: "./src/entries/index.html",
    minify: {
      // 是对html文件进行压缩
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true // 去掉属性的双引号
    },
    hash: true,
  }),

  new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash:8].css',
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: false,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  })
];

export default plugins;