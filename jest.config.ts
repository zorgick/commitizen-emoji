import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

// Load the config which holds the path aliases.
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      // This has to match the baseUrl defined in tsconfig.json.
      prefix: '<rootDir>/',
    }),
  },
  setupFilesAfterEnv: ['./src/__tests__/mocks/setupEnv.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/mocks/'
  ]
};

export default config;
