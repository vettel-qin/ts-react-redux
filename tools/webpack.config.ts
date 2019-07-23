import webpack from 'webpack';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import UglifyjsPligin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import plugins from './plugins';

import jsLoader from './loaders/jsLoader';
import styleLoader from './loaders/styleLoader';
import fileLoader from './loaders/fileLoader';
import analyze from './analyze';
import * as paths from './paths.config';

const isDev = process.argv.includes('--dev');
const isAnalyze = process.argv.includes('--analyze');

const webpackConfig: webpack.Configuration = {
  entry: {
    main: './src/entries/index.tsx',
  },

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:8].js',
    chunkFilename: isDev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:8].js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: paths.SRC_DIR,
      }),
    ],
  },

  module: {
    rules: [...jsLoader, ...styleLoader, ...fileLoader],
  },

  plugins: isAnalyze ? [...plugins, ...analyze] : [...plugins],

  optimization: {
    // 缓存webpack固定生成的代码块，该代码块通常不变。用于维系各个代码块关系的代码。
    runtimeChunk: {
      name: 'mainfest',
    },

    // 指定node_modules中的第三方代码进行分离
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },

    minimizer: [
      new UglifyjsPligin({
        // 文件缓存，当js文件没有变化时就使得缓存
        cache: true,
        // 采用多线程来加速压缩
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },

  devServer: {
    port: 8088,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: false,
    proxy: {
      '/wechatBH': {
        target: 'http://wx-test.by-health.com/',
        changeOrigin: true,
      },
      '/scrm': {
        target: 'http://wx-test1.by-health.com/',
        changeOrigin: true,
      },
    },
  },
};

export default webpackConfig;
