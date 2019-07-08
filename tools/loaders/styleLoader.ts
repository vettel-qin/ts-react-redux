import * as paths from "../paths.config";
import theme from '../../theme';

const styleLoader = [
  {
    test: /\.scss$/,
    // 只针对src下的.scss文件进行编译
    include: paths.SRC_DIR,
    use: [
      {
        loader: "style-loader"
      },

      {
        loader: 'cache-loader'
      },

      {
        loader: "typings-for-css-modules-loader",
        options: {
          // 是否有使用css modules
          modules: true,
          // 类名导出
          namedExport: true,
          // 支持驼峰
          camelCase: true,
          // 是否使用sass
          sass: true,
          localIdentName: "[local]_[hash:base64:5]"
        }
      },
      {
        loader: "sass-loader",
        options: {
          includePaths: [paths.STYLES_DIR],
          sourceMap: true
        }
      }
    ]
  },

  {
    test: /\.(less|css)$/,
    use: [
      {
        loader: "style-loader"
      },

      {
        loader: "css-loader"
      },

      {
        loader: 'cache-loader'
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
];

export default styleLoader;