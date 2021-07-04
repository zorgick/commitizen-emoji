import {
  CommonObjectType,
  ConfigType,
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
export type JoinTypesType = (
  gitmojiTypes: GitmojiObjectType[],
  userConfig?: Partial<ConfigType>
) => Promise<GitmojiObjectType[]>;
export type UniteConfigsType = (
  defaultConfig: ConfigType,
  userConfig: Partial<ConfigType> | null,
  gitmojiTypes: GitmojiObjectType[]
) => Promise<ConfigType>;
