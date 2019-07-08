import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import plugins from './plugins';

import jsLoader from './loaders/jsLoader';
import styleLoader from './loaders/styleLoader';
import fileLoader from './loaders/fileLoader';
import optimization from './optimization';
import * as paths from './paths.config';

const isDev = process.argv.includes('--dev');

module.exports = {
  entry: {
    main: './src/entries/index.tsx',
  },

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:8].js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: paths.SRC_DIR,
      }),
    ],
    alias: {
      // '~': paths.SRC_DIR,
      // 'react-dom': '@hot-loader/react-dom'
    },
  },

  module: {
    rules: [...jsLoader, ...styleLoader, ...fileLoader],
  },

  plugins: [...plugins],
  optimization,
};
