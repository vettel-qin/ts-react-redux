import UglifyjsPligin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const optimization = {
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
      }
    }
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
  ]
}

export default optimization;