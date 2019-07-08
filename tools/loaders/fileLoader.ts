import * as paths from "../paths.config";

const fileLoader = [
  {
    test: /\.png$/i,
    use: [
      {
        loader: 'url-loader',
        // options: {
        //   name: "assets/[hash:8].[ext]",
        //   limit: 8192,
        // },
      },
    ],
  },
];

export default fileLoader;