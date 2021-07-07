import {
  ConfigType,
} from './index';

// DTOs
export type EmojiOptionType = {
  name: string;
  value: {
    emoji: string;
    name: string;
  };
  code: string;
};

// Functions

export type SelectEmojiOptionsType = (
  config: ConfigType,
) => EmojiOptionType[];
