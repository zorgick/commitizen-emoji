import {
  StringObjectType,
  GitmojiObjectType,
} from './index'

// DTOs

export type ConfigType = {
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "types": [
   *      {
   *        "emoji": "😱",
   *        "code": ":wtf:",
   *        "description": "I don't understand a bit in all this code.",
   *        "name": "wtf"
   *      }
   *   ]
   * }
   * ```
   * List of custom user types defined in the manner of gitmoji types.
   */
  types: GitmojiObjectType[];
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "types": [
   *      {
   *        "emoji": "😱",
   *        "code": ":wtf:",
   *        "description": "I don't understand a bit in all this code.",
   *        "name": "wtf"
   *      }
   *   ]
   *   "replaceTypes": true
   * }
   * ```
   * Should custom user types replace default gitmoji types.
   * Defaults to false - types will be merged, and user types
   * will take precedence over default types.
   * This option will have no effect if types array is not defined.
   */
  replaceTypes: boolean;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "scopes": ["readme", "cypress", "linters"]
   * }
   * ```
   * List of custom user scopes.
   * Defaults to empty array.
   * Affects the way the prompt behaves. If there are scopes, prompt will 
   * suggest to select scope instead of typing it.
   */
  scopes: string[];
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "symbol": true
   * }
   * ```
   * Should emoji be depicted as a grapheme or as a code.
   * Defaults to false - code.
   * Some terminals (e.g., Windows terminal) cannot substitute a code
   * with a grapheme, so it helps to show an emoji correctly in your terminal.
   */
  symbol: boolean;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "skipQuestions": ["body", "breakingBody"]
   * }
   * ```
   * List of question that must be skipped by the prompt.
   * Defaults to empty array.
   */
  skipQuestions: 'scope' | 'body' | 'breakingBody' | 'issues'[];
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "questions": {
   *     "type": "What emoji type is the fanciest of them all?: "
   *    }
   * }
   * ```
   * User defined question for each prompt.
   * Defaults to empty object.
   */
  questions: Record<'type' | 'scope' | 'subject' | 'body' | 'breakingBody' | 'issues', string>;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "subjectMaxLength": 100
   * }
   * ```
   * Maximum length of the subject.
   * Defaults to 75.
   */
  subjectMaxLength: number;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "conventionalFormat": true
   * }
   * ```
   * Should the emoji insert its name (a.k.a. type) after itself, in order to 
   * pass other commit linters (e.g., commitlint).
   * Defaults to false - name is not added.
   */
  conventionalFormat: boolean;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "selectedTypesByCode": [":art:", ":memo:", ":sparkles:", ":bug:"]
   * }
   * ```
   * List of **gitmoji** types that user wants to work with. Types are picked
   * by emoji codes.
   * If types are provided and replaceTypes option is set to true, this list is neglected.
   * If usePack option is provided, this list is neglected.
   * The code string format must strictly conform to gitmoji code format.
   * Default to empty array - all **gitmoji** types are used.
   */
  selectedTypesByCode: string[];
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "typeNamesByCode": {
   *      ":fire:": "cowabunga",
   *      ":poop:": "it-is-treason-then"
   *    },
   * }
   * ```
   * Map of code-name pairs.
   * Allows to redefine emoji names by selecting them by code and giving them 
   * new names.
   * If types are provided and replaceTypes is set to true, this map is neglected.
   * Default map will be present somewhere in readme.
   */
  typeNamesByCode: StringObjectType;
  /**
   * @example
   * ```json
   * "commitizenEmoji": {
   *   "usePack": "conventional"
   * }
   * ```
   * Allows to use one of the most popular sets of types.
   * Each set comes with appropriate names and emojis, the latter is opinionated.
   * If types are provided, this option is neglected.
   * Defaults to empty string - standard gitmoji types are used.
   */
  usePack: 'conventional' | '';
};

export type CommitizenConfigType = {
  config?: {
    commitizenEmoji?: ConfigType;
  };
  [key: string]: any;
};

export type ResponseGitmojiType = {
  gitmojis: GitmojiObjectType[];
};

// Functions

export type LoadLocalFileType = <T>(filePath?: string) => Promise<T>;
export type LoadConfigType = (filePath?: string) => Promise<Partial<ConfigType> | null>;
export type LoadGitmojiType = () => Promise<GitmojiObjectType[]>;
export type GetConfigType = () => Promise<ConfigType>;
