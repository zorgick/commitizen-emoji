import {
  FormatTitleType,
  FormatScopeOptionType,
} from 'types';

export const formatScopeOption: FormatScopeOptionType = (scope) => {
  return scope && scope.trim() ? `(${scope.trim()})` : ''
}

export const formatTitle: FormatTitleType = ({ type, scope, subject }, config) => {
  const formattedScope = formatScopeOption(scope)
  const prelude = config.conventionalFormat
    ? `${type.emoji} ${type.name}${formattedScope}:`
    : `${type.emoji}${formattedScope ? ' ' + formattedScope + ':' : ''}`

  return `${prelude} ${subject}`
}

