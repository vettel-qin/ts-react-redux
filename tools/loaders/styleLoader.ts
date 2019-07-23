import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as paths from '../paths.config';
import theme from '../../theme';
const isDev = process.argv.includes('--dev');

const styleLoader = [
  {
    test: /\.(css|scss)$/i,
    rules: [
      {
        loader: isDev
          ? 'style-loader'
          : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
      },

      {
        loader: 'cache-loader',
      },

      {
        exclude: paths.SRC_DIR,
        loader: 'css-loader',
        options: {
          sourceMap: isDev ? true : false,
        },
      },

      {
        include: paths.SRC_DIR,
        loader: 'css-loader',
        options: {
          sourceMap: isDev ? true : false, // 启用/禁用 Sourcemap
          modules: true, // 启用/禁用 CSS 模块
          importLoaders: 2, // 在 css-loader 前应用的 loader 的数量
          localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]', // 配置生成的标识符
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },

  {
    test: /\.less$/,
    use: [
      isDev
        ? 'style-loader'
        : {
            loader: MiniCssExtractPlugin.loader,
          },

      {
        loader: 'cache-loader',
      },

      {
        loader: 'css-loader',
      },

      {
        loader: 'less-loader',
        options: {
          // 禁用内联js代码，这个功能用于禁用在样式表里面写js代码
          javascriptEnabled: true,
          // 根据antd官网进行主题修改
          modifyVars: theme,
        },
      },
    ],
  },
];

export default styleLoader;
