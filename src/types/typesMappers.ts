import {
  StringObjectType,
  GitmojiObjectType,
} from './index';

// DTOs

// Functions

export type MapTypeNamesType = (
  gitmojiTypes: GitmojiObjectType[],
  userTypeNames?: StringObjectType | null
) => GitmojiObjectType[];
