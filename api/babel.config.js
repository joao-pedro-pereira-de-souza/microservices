module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@controllers": "./src/controllers",
          "@functions": "./src/functions",
          "@utils": "./src/utils",
          "@middlewares": "./src/middlewares",
          "@routes": "./src/routes",
          "@configs": "./src/configs",
          "@interfaces": "./src/interfaces",
          "@schemas": "./src/schemas",
          "@validations": "./src/validations",
          "@contents": "./src/contents",
          "@jobs": "./src/jobs",
          "@root": "./",
        },
      },
    ],
  ],

  ignore: ["**/*.test.ts"],
};
