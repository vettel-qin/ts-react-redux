import webpack from "webpack";
import path from 'path';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import tsImportPluginFactory from 'ts-import-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import plugins from './plugins';
import theme from '../theme';

import jsLoader from './loaders/jsLoader';
import styleLoader from './loaders/styleLoader';
import fileLoader from './loaders/fileLoader';
import optimization from './optimization';
import * as paths from "./paths.config";

const isDev = process.argv.includes('--dev');

module.exports = {
  entry: {
    main: "./src/entries/index.tsx",
  },

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:8].js',
    publicPath: ''
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: paths.SRC_DIR,
      })
    ],
    alias: {
      // '~': paths.SRC_DIR,
      // 'react-dom': '@hot-loader/react-dom'
    }
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "cache-loader",
          },
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              babelrc: false,
              plugins: [
                'react-hot-loader/babel',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true,
                  })
                ]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          },
        ],
        include: paths.SRC_DIR,
      },

      {
        test: /\.(css|scss)$/i,
        include: paths.SRC_DIR,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },

          {
            loader: 'cache-loader',
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev ? true : false, // 启用/禁用 Sourcemap
              modules: true, // 启用/禁用 CSS 模块
              importLoaders: 2, // 在 css-loader 前应用的 loader 的数量
              localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]' // 配置生成的标识符
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ],
      },

      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          },
    
          {
            loader: 'cache-loader'
          },

          {
            loader: 'css-loader',
          },
    
          {
            loader: "less-loader",
            options: {
              // 禁用内联js代码，这个功能用于禁用在样式表里面写js代码
              javascriptEnabled: true,
              // 根据antd官网进行主题修改
              modifyVars: theme
            }
          }
        ]
      },

      // {
      //   test: /\.less$/,
      //   use: [
      //     isDev ? 'style-loader' : {
      //       loader: MiniCssExtractPlugin.loader,
      //       // options: {
      //       //   publicPath: '../'
      //       // }
      //     },

      //     {
      //       loader: 'cache-loader'
      //     },
    
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: isDev ? true : false, // 启用/禁用 Sourcemap
      //         modules: true, // 启用/禁用 CSS 模块
      //         importLoaders: 1, // 在 css-loader 前应用的 loader 的数量
      //         localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]' // 配置生成的标识符
      //       }
      //     },
    
      //     {
      //       loader: "less-loader",
      //       options: {
      //         // 禁用内联js代码，这个功能用于禁用在样式表里面写js代码
      //         javascriptEnabled: true,
      //         // 根据antd官网进行主题修改
      //         modifyVars: theme
      //       }
      //     }
      //   ]
      // },

      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]',
        },
      },

      {
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[hash].[ext]',
				},
			},

			{
				test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
				loader: 'file-loader',
				options: {
					name: 'media/[hash].[ext]',
				},
      },
      
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        include: paths.SRC_DIR,
      }

      // {
      //   test: /\.scss$/,
      //   // 只针对src下的.scss文件进行编译
      //   include: paths.SRC_DIR,
      //   use: [
      //     {
      //       loader: "style-loader"
      //     },
    
      //     {
			// 			loader: 'css-loader',
			// 			options: {
			// 				// sourceMap: true,
			// 				modules: true,
			// 			},
			// 		},
    
      //     // {
      //     //   loader: "typings-for-css-modules-loader",
      //     //   options: {
      //     //     // 是否有使用css modules
      //     //     modules: true,
      //     //     // 类名导出
      //     //     namedExport: true,
      //     //     // 支持驼峰
      //     //     camelCase: true,
      //     //     // 是否使用sass
      //     //     sass: true,
      //     //     localIdentName: "[local]_[hash:base64:5]"
      //     //   }
      //     // },
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         includePaths: [paths.STYLES_DIR],
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // },
    ]

      

      // {
      //   test: /\.scss$/,
      //   // 只针对src下的.css|.styl文件进行编译
      //   include: paths.SRC_DIR,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "typings-for-css-modules-loader",
      //       options: {
      //         // 是否有使用css modules
      //         modules: true,
      //         // 类名导出
      //         namedExport: true,
      //         // 支持驼峰
      //         camelCase: true,
      //         // 是否使用sass
      //         sass: true,
      //       }
      //     },

      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // }
  },

  plugins: [...plugins],
  optimization,
};

// export default webpackConfig;