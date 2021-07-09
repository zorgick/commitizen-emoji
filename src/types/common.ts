import { Answers } from 'inquirer';
import {
  TYPE_NAMES
} from 'consts';

export type StringObjectType = Record<string, string>
export type CommonObjectType = Record<string, any>
export type CodeNamesType = typeof TYPE_NAMES[number][0]

// DTOs
export type AnswersHashesType = {
  type: {
    emoji: string;
    name: string;
  };
  scope: string;
  subject: string;
  body: string;
  breakingBody: string;
  issues: string;
};

export interface MapInstance<K, V> {
  clear(): void;
  delete(key: K): boolean;
  entries(): IterableIterator<[K, V]>;
  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V;
  has(key: K): boolean;
  keys(): IterableIterator<K>;
  set(key: K, value?: V): Map<K, V>;
  size: number;
  values(): IterableIterator<V>;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  [Symbol.toStringTag]: string;
}

export interface MapConstructor {
  new <K, V>(): Map<K, V>;
  new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
  prototype: Map<any, any>;
}

declare var MapInstance: MapConstructor;
