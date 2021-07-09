import { Question } from 'inquirer';
import {
  ConfigType,
  AnswersHashesType,
} from './index';

// DTOs

// Functions

export type CreateQuestionsType = (
  config: ConfigType,
) => Question[];
export type FilterSubjectQuestionsType = (
  userInput: string,
  answers: AnswersHashesType,
) => any;
