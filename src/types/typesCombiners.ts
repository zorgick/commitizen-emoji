import {
  CommonObjectType,
  CodeNamesType,
} from './index';

// DTOs
export type GitmojiObjectType = CommonObjectType & {
  code: CodeNamesType;
  emoji: string;
  name: string;
  description: string;
};

// Functions

export type MergeTypeListsType = (
  gitmojiTypes: GitmojiObjectType[],
  userTypes: GitmojiObjectType[],
) => GitmojiObjectType[];
