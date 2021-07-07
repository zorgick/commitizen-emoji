import { Answers } from 'inquirer';
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
export type FinalFormatAnwersType =
  Pick<AnswersHashesType, 'subject'>
  & Partial<Pick<AnswersHashesType, 'body' | 'breakingBody' | 'issues'>>;

// Functions

export type FormatScopeOptionType = (
  scope: string,
) => string;
export type FormatTitleType = (
  userAnswers: FormatTitleAnwersType,
  config: ConfigType,
) => string;
export type FormatCommitBodyType = (
  commitBody: string,
  terminalColumns: number,
) => string;
export type FormatIssuesType = (
  issues: string,
  config: ConfigType,
) => string;
export type FinalFormatType = (
  answers: FinalFormatAnwersType,
  config: ConfigType,
) => string;
