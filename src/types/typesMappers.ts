import {
  StringObjectType,
  GitmojiObjectType,
} from './index';

// DTOs

// Functions

export type MapSelectedCodesType = (
  selectedTypeNames?: any[],
) => string[][];
export type MapTypeNamesType = (
  gitmojiTypes: GitmojiObjectType[],
  userChoice?: {
    selectedTypeNames?: string[],
    userTypeNames?: StringObjectType | null
  }
) => GitmojiObjectType[];
