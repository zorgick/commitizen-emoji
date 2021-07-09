import { ConfigType } from 'types';

export const DEFAULT_CONFIG: ConfigType = {
  types: [],
  replaceTypes: false,
  scopes: [],
  symbol: false,
  skipQuestions: [],
  questions: {
    type: 'Select the type of change you\'re committing: ',
    scope: 'Specify a scope:',
    subject: 'Provide a commit title:',
    body: 'Provide a commit description:',
    breakingBody: 'Specify key features of a BREAKING CHANGE:',
    issues: 'Resolved or linked issues (1, 2, ...):',
  },
  subjectMaxLength: 75,
  issuesPrefix: '',
  conventionalFormat: false,
  selectedTypesByCode: [],
  typeNamesByCode: {},
  usePack: '',
};
