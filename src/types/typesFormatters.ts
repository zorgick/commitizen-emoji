import {
  ConfigType,
} from './index';

// DTOs
export type AnswersHashesType = {
  type: {
    emoji: string;
    name: string;
  };
  scope: string;
  subject: string;
  body: string;
  breakingBody: string;
  issues: string;
};
export type FormatTitleAnwersType = Pick<AnswersHashesType, 'type' | 'scope' | 'subject'>;

// Functions

export type FormatScopeOptionType = (
  scope: string,
) => string;
export type FormatTitleType = (
  userAnswers: FormatTitleAnwersType,
  config: ConfigType,
) => string;
