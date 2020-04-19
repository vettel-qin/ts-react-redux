module.exports = {
  extends: "stylelint-config-standard",
  // 需要忽略掉一些检测文件类型
  ignoreFiles: [
    "node_modules/**/*.scss",
    "node_modules/**/*.less",
    "node_modules/**/*.css",
    "**/*.md",
    "**/*.js",
    "**/*.ts",
    "**/*.tsx",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],

  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [ "at-root",
          "content",
          "extend",
          "include",
          "mixin",
          "function",
          "return",
          "debug",
          "warn",
          "error",
          "if",
          "else",
          "for",
          "each",
          "while",
        ],
      },
    ],
    indentation: 2,
    // 不允许未知属性
    "property-no-unknown": [
      true,
      { ignoreProperties: ["composes"] },
    ],

    // 不允许未知的伪类选择器
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global", "local"] },
    ],
  },
};
