<h1 align="center">commitizen-emoji</h1>
<br/>

<p align="center">
<a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly" /></a>
<a href="https://github.com/zorgick/commitizen-emoji/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
<a href="https://github.com/zorgick/commitizen-emoji/blob/master/license"><img src="https://img.shields.io/github/license/zorgick/commitizen-emoji.svg" alt="License - MIT" /></a>
</p>


## Getting started

**commitizen-emoji** allows you to easily use emojis in your commits with [commitizen].


**Why?**


According to the [Telegraph],
the average human attention span has recently dropped from 🙈 12 seconds to
8 seconds, docking us below that of a goldfish. Developers are much less likely
to read the whole [conventional] commit message of every file, when there are 
📄 pages of a codebase itself. Reading even a single commit message requires
a maximum of a few seconds of focus per file. And we all know, that 🔥 wasting
an engineer's time is an unacceptable luxury.


Emojis satisfy this desire for fast and efficient scanning of commit history
across files. There are several advantages that emojis bring:
- they're small *key text anchors* (a sequence of one or more code points that are
  displayed as a grapheme).
- they're *eye-catching*! Look at the picture below.
  Let's be honest! What drew your attention first? A dull formal text or a shiny
  emoji star ✨?
![picture 1]
- they're *recognizable*! Like really! Sometimes it can take a certain amount of time
  to confidently tell the difference between this emoji 📄 and this emoji 📝,
  but you will definitely understand that this 🎨 means code restyle, and this
  🐛 means a bug fix.
- they're *growing in 📈 numbers*, so you will always find a desired emoji for your
  needs.
- they're *fun* 🎉 and *fancy* 💄!

Thus, these shortened focus times make the use of emojis a way to not only
consume information, but to easily understand it.


## Demo 
```sh
? Select the type of change you are committing: (Use arrow keys or type to search)
❯ codestyle    🎨  Improving structure / format of the code. 
  perf         ⚡️  Improving performance. 
  prune        🔥  Removing code or files. 
  fix          🐛  Fixing a bug. 
  quickfix     🚑  Critical hotfix. 
  feature      ✨  Introducing new features. 
  docs         📝  Writing docs. 

# Other prompts and answers...
```

```sh
# Resulting commit header (with conventional set to false)
✨ (nonconventional): this works, but makes commitlint break

# Resulting commit header (with conventional set to true)
✨ feature(conventional): this works, and commitlint allows it
```

## Installation

> 🚩 **Note**
>
> Keep it local =)

```sh
yarn add -D commitizen commitizen-emoji

# set as default adapter for your projects
echo '{ "path": "./node_modules/commitizen-emoji" }' > ./.czrc
```

OR add this to your package.json

```json
  "config": {
    "commitizen": {
      "path": "./node_modules/commitizen-emoji"
    }
  },
```

## Usage

```sh
yarn cz
```
OR if [husky] hooks are set up

```sh
# if commitlint is present in commit-msg hook
git commit -m 'a'  # 'a' will be neglected after commitlint checks commit message prepared by commitizen

# if commitlint is not enabled in commit-msg
yarn cz
```

## Customization

Configuring `commitizen-emoji`:

I. `package.json`
```json
{
  "config": {
    "commitizen-emoji": {}
  }
}
```
II. `./.czrc`
```sh
{
  "config": {
    "commitizen-emoji": {}
  }
}
```

## Configuration Options

#### types

By default `commitizen-emoji` comes preconfigured with the [Gitmoji](https://gitmoji.carloscuesta.me/) types.

```sh
{
  "config": {
    "commitizen-emoji": {
      "types": [
        {
          "emoji": "🌟",
          "code": ":star2:",
          "description": "A new feature",
          "name": "feature"
        }
      ]
    }
  }
}
```

#### scopes

```sh
{
  "config": {
    "commitizen-emoji": {
      "scopes": ["home", "accounts", "ci"]
    }
  }
}
```

#### symbol

Use grapheme emoji (true) instead of its text code (false); 


Defaults to false.

```sh
{
  "config": {
    "commitizen-emoji": {
      "symbol": true
    }
  }
}
```

#### skipQuestions

An array of questions you want to skip:

```sh
{
  "config": {
    "commitizen-emoji": {
      "skipQuestions": ["scope", "breakingBody"] # allowed values:
      # "body" - removes long description,
      # "scope" - removes scope, 
      # "breakingBody" - removes BREAKING CHANGE (a.k.a. supplementary long description) description,
      # "issues" - removes resolved or linked issues
    }
  }
}
```

#### questions

Questions overrides:

```sh
{
  "config": {
    "commitizen-emoji": {
      "questions": {
        "body": "This will be displayed instead of original text" # allowed keys:
        # "type" - type prompt message, 
        # "scope" - scope prompt message, 
        # "subject" - subject prompt message, 
        # "breakingBody" - BREAKING CHANGE prompt message,
        # "issues" - issues prompt message
      }
    }
  }
}
```

#### subjectMaxLength

The maximum length of your subject

> 🚩 **Note**
>
> Make sure [commitlint] (if present) is configured to accept this length change

```sh
{
  "config": {
    "commitizen-emoji": {
      "subjectMaxLength": 200
    }
  }
}
```

#### conventional

Place emoji before type to conform to conventional scheme of a commit header.


Defaults to false.

> 🚩 **Note**
>
> Make sure [commitlint] (if present) is configured to accept this length change

```sh
{
  "config": {
    "commitizen-emoji": {
      "conventional": true
    }
  }
}
```

## Examples

[.czrc](./.czrc)


[commitlint.config.js](./commitlint.config.js)

## Commitlint

[Commitlint] needs external package [commitlint-config-gitmoji] and types from 
**commitizen-emoji** to make everything work

```sh
yarn add -D commitlint-config-gitmoji

# create commitlint config file in the root directory
touch commitlint.config.js
```

Tune `commitlint.config.js` according to [commitlint] rules:

```js
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
        'my custom type'
      ]
    ],
  },
}
```

> 🚩 **Note**
>
> Update [commitizen] config (`./.czrc` or in `package.json`) to make commit
> header conform to conventional format.

```sh
{
  "config": {
    "commitizen-emoji": {
      "conventional": true
    }
  }
}
```

## Cudos

Check out the origins of emoji commits - [gitmoji](https://gitmoji.dev/) fancy website.


[commitizen]: https://github.com/commitizen/cz-cli
[picture 1]: https://github.com/zorgick/commitizen-emoji/blob/master/assets/repo_preview.jpg?raw=true
[husky]: https://github.com/typicode/husky
[commitlint-config-gitmoji]: https://github.com/arvinxx/gitmoji-commit-workflow
[commitlint]: https://commitlint.js.org/#/reference-rules
[conventional]: https://www.conventionalcommits.org/en/v1.0.0/
[Telegraph]: https://www.telegraph.co.uk/science/2016/03/12/humans-have-shorter-attention-span-than-goldfish-thanks-to-smart/
