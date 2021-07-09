import {
  ConfigType,
  AnswersHashesType,
} from './index';

// DTOs
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
  commitBody: string | undefined,
  terminalColumns: number,
) => string;
export type FormatIssuesType = (
  issues: string | undefined,
  config: ConfigType,
) => string;
export type FinalFormatType = (
  answers: FinalFormatAnwersType,
  config: ConfigType,
) => string;
