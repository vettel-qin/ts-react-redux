import * as paths from '../paths.config';

const fileLoader = [
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
  },
];

export default fileLoader;
