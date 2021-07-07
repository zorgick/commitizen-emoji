import pad from 'pad';
import { SelectEmojiOptionsType } from 'types';

export const selectEmojiOptions: SelectEmojiOptionsType = ({ types, symbol }) => {
  const maxNameLength = types.reduce(
    (maxLength, type) => (type.name.length > maxLength ? type.name.length : maxLength),
    0
  );

  return types.map(type => ({
    name: `${pad(type.name, maxNameLength)}  ${type.emoji}  ${type.description}`,
    value: {
      emoji: symbol ? type.emoji : type.code,
      name: type.name
    },
    code: type.code
  }));
}
