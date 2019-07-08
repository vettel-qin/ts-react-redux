// Prettier configuration
// https://io/docs/en/configuration.html
module.exports = {
  stylelintIntegration: true, // 让prettier使用stylelint的代码格式校验
  tabWidth: 2, // 缩进字节数
  singleQuote: true, // 使用单引号替换双引号
  semi: true, // 句末加分号
  printWidth: 120, // 超过最大值换行
  arrowParens: "avoid", // (x) => {} 是否要有小括号 avoid：省略括号
  proseWrap: "preserve", //默认值。 是否要换行
  trailingComma: "all", // 在对象或数组最后一个元素是否加逗号
  tslintIntegration: true, // 让prettier使用tslint的代码格式进行校验
};