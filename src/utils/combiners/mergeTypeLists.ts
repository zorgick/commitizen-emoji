import {
  MergeTypeListsType,
} from 'types';

export const mergeTypeLists: MergeTypeListsType = (gitmojiTypes, userTypes) => {
  return userTypes.reduce((gitmojis, userTypeItem) => {
    const defaultGitmojiTypeIndex = gitmojis.findIndex((gitmojiType) => {
      return gitmojiType.code === userTypeItem.code
    });

    // if there is an intersection
    // use the lattest userType
    if (defaultGitmojiTypeIndex >= 0) {
      gitmojis[defaultGitmojiTypeIndex] = userTypeItem;
      return gitmojis;
    }
    return [...gitmojis, userTypeItem];
  }, [...gitmojiTypes]);
}
