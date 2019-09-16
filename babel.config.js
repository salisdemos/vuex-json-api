// babel.config.js
module.exports = api => {
  // only configure babel for jest stuff
  if (api.env('test')) {
    return {
      plugins: [
        ["@babel/plugin-transform-modules-commonjs", {
          "allowTopLevelThis": true
        }]
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    }
  }

  // by default, this library does not do babel transforms
  return {};
};
