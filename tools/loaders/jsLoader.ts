import * as paths from "../paths.config";
import tsImportPluginFactory from 'ts-import-plugin';

const jsLoader = [
  {
    test: /\.ts(x?)$/,
    use: [
      {
        loader: "cache-loader",
      },
      // {
      //   loader: "babel-loader",
      //   options: {
      //     babelrc: false,
      //     plugins: [
      //       'react-hot-loader/babel'
      //     ]
      //   }
      // },
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
  }
];

export default jsLoader;