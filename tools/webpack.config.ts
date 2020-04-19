import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyjsPligin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// tslint:disable-next-line:no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import * as paths from './paths.config';

const isDev = process.argv.includes('--dev');

const webpackConfig: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',

  entry: {
    main: ['react-hot-loader/patch', './src/entries/index.tsx'],
  },

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[hash:8].js',
    chunkFilename: isDev ? 'scripts/[name].js' : 'scripts/[name].[hash:8].js',
    publicPath: '',
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      // Allow absolute paths in imports, e.g. import Button from '~/components/Button'
      // Keep in sync with tsconfig.json
      '~': paths.SRC_DIR,
      'react-dom': '@hot-loader/react-dom'
    },
    // plugins: [
    //   new TsconfigPathsWebpackPlugin({
    //     configFile: paths.SRC_DIR,
    //   }),
    // ],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              babelrc: false,
              plugins: ['@babel/plugin-syntax-dynamic-import', 'react-hot-loader/babel'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esNext', // for Tree-shaking
                sourceMap: isDev,
              },
            },
          },
        ],
        include: paths.SRC_DIR,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isDev ? 'style-loader' :
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },

          {
            loader: 'cache-loader',
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev ? true : false, // 启用/禁用 Sourcemap
              modules:{
                localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]', // 配置生成的标识符
              },
              importLoaders: 2, // 在css-loader前应用的loader数量
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev ? true : false, // 启用/禁用 Sourcemap
              sassOptions: {
                includePaths: [paths.STYLES_DIR],
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'media/',
        },
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      dry: false, // 默认false dry为true时，模拟删除，加删除，不会真的删掉文件
      verbose: true, // 默认false verbose为true时 显示日志， 当dry为true时，总是会打印日志，不管verbose是什么值
      cleanStaleWebpackAssets: true,  // 自动删除未被使用的webpack资源
      cleanOnceBeforeBuildPatterns: ['**/*'] // 打包前做的一些事
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
    }),

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

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
    }),
  ],

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
    contentBase: paths.SRC_DIR,
    hot: true,
    hotOnly: true,
    inline: true,
  }

};

export default webpackConfig;

