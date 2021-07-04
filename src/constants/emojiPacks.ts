export const CONVENTIONAL_TYPES = [
  ':wrench:', // Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  ':construction_worker:', // Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  ':memo:', // Documentation only changes
  ':sparkles:', // A new feature
  ':bug:', // A bug fix
  ':zap:', // A code change that improves performance
  ':recycle:', // A code change that neither fixes a bug nor adds a feature
  ':art:', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  ':test_tube:', // Adding missing tests or correcting existing tests
]

export const CONVENTIONAL_NAMES = {
  ':wrench:': 'build',
  ':construction_worker:': 'ci',
  ':memo:': 'docs',
  ':sparkles:': 'feat',
  ':bug:': 'fix',
  ':zap:': 'perf',
  ':recycle:': 'refactor',
  ':art:': 'style',
  ':test_tube:': 'test',
}
