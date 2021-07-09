import fuse from 'fuse.js'
import { Question } from 'inquirer';

import {
  CreateQuestionsType,
  AnswersHashesType,
} from 'types';
import lib from 'lib';

const createQuestions: CreateQuestionsType = (config) => {
  const choices = lib.selectEmojiOptions(config)

  const fuzzy = new fuse(choices, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'code']
  })

  const questions: Question[] = [
    {
      type: 'autocomplete',
      name: 'type',
      message: config.questions.type,
      // addons are conflicting with inquirer types, so
      // @ts-ignore
      source: (_, query) => Promise.resolve(query ? fuzzy.search(query) : choices)
    },
    {
      type: config.scopes ? 'list' : 'input',
      name: 'scope',
      message: config.questions.scope,
      // addons are conflicting with inquirer types, so
      // @ts-ignore
      choices: config.scopes && [{ name: '[none]', value: '' }].concat(config.scopes),
      when: !config.skipQuestions.includes('scope')
    },
    {
      type: 'maxlength-input',
      name: 'subject',
      message: config.questions.subject,
      // addons are conflicting with inquirer types, so
      // @ts-ignore
      maxLength: config.subjectMaxLength,
      filter: (
        subject: string,
        answers: AnswersHashesType
      ): string => lib.formatTitle({ ...answers, subject }, config)
    },
    {
      type: 'editor',
      name: 'body',
      message: config.questions.body,
      when: !config.skipQuestions.includes('body')
    },
    {
      type: 'editor',
      name: 'breakingBody',
      message: config.questions.breakingBody,
      when: !config.skipQuestions.includes('breakingBody')
    },
    {
      type: 'input',
      name: 'issues',
      message: config.questions.issues,
      when: !config.skipQuestions.includes('issues')
    }
  ]

  return questions
}


/**
 * Export an object containing a `prompter` method. This object is used by `commitizen`.
 *
 * @type {Object}
 */
export default {
  // types are not provided by commitizen, so
  // @ts-ignore
  prompter: function(cz, commit) {
    cz.prompt.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
    cz.prompt.registerPrompt('maxlength-input', require('inquirer-maxlength-input-prompt'))

    lib.getConfig()
      .then((config) => ({ config, questions: createQuestions(config) }))
      .then(({ config, questions }) => {
        return cz.prompt(questions)
          .then((answers: any) => ({ config, answers }))
      })
      .then(({ config, answers }) => lib.finalFormat(answers, config))
      .then(commit)
  }

}
