一、项目初始化
1、全局安装 typescript，默认已经安装 node 以及 npm
npm install -g typescript

2、新建文件夹 ts-react-redux 并进入

3、进行初始化，生成 package.json 和 tsconfig.json
yarn init -y && tsc --init

4、安装开发工具
webpack 原本的包不包含验证包，所以需要安装相关 ts 验证包
yarn add webpack @types/webpack webpack-cli webpack-dev-server -D

5、安装 react 相关
react 原本的包不包含验证包，所以需要安装相关 ts 验证包
yarn add react react-dom -S
yarn add @types/react @types/react-dom -D

6、安装 ts-loader 或者 awesome-typescript-loader
这两款 loader 用于将 ts 代码编译成 js 代码，本文档使用 ts-loader
yarn add ts-loader -D 或 yarn add awesome-typescript-loader -D

二、项目启动
1、webpack 配置
(1)、在项目根目录下新建 tools 文件夹并进入新建 webpack.config.ts

(2)、在项目根目录下新建 src 文件夹，然后在 src 里新建 entries 文件夹并进入新建 index.tsx 文件
作为项目入口

(3)、编写简单的 webpack 配置，只包含 entry 和 output：
​​![0]()

(4)、编写 ts-loader 配置项
