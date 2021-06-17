const { typeNames } = require('./lib');

module.exports = {
  extends: ['gitmoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      // declare emoji type names by copying them from commitizen-emoji
      [
        ...typeNames,
      ]
    ],
  },
}
