import {
  FormatTitleAnwersType,
  ConfigType,
} from 'types'
import lib from 'lib';
import testConfig from '../fixtures/fullTestConfig.json'

const setup = (
  adjustedAnswers?: Partial<FormatTitleAnwersType> | null,
  adjustedConfig?: Partial<ConfigType>
) => {
  const testAnswers: FormatTitleAnwersType = {
    type: {
      emoji: '=)',
      name: 'happy'
    },
    scope: '',
    subject: 'test',
    ...adjustedAnswers,
  };
  const config: ConfigType = {
    ...testConfig as ConfigType,
    ...adjustedConfig,
  }

  return {
    testAnswers,
    config,
  };
}

test('hides colons for non-conventional title, if scope is missing', () => {
  const { testAnswers, config } = setup();
  const result = lib.formatTitle(testAnswers, config);
  expect(result).toEqual(`${testAnswers.type.emoji} ${testAnswers.subject}`)
})

test('appends colons for non-conventional title, if scope is present', () => {
  const { testAnswers, config } = setup({ scope: 'tdd' });
  const result = lib.formatTitle(testAnswers, config);
  expect(result).toEqual(`${testAnswers.type.emoji} (${testAnswers.scope}): ${testAnswers.subject}`)
})

test('appends colons for conventional title in any case', () => {
  const { testAnswers: testAnswers1, config: config1 } = setup(
    { scope: 'tdd' },
    { conventionalFormat: true }
  );
  const result1 = lib.formatTitle(testAnswers1, config1);
  expect(result1).toEqual(`${testAnswers1.type.emoji} ${testAnswers1.type.name}(${testAnswers1.scope}): ${testAnswers1.subject}`)

  const { testAnswers: testAnswers2, config: config2 } = setup(
    null,
    { conventionalFormat: true }
  );
  const result2 = lib.formatTitle(testAnswers2, config2);
  expect(result2).toEqual(`${testAnswers2.type.emoji} ${testAnswers2.type.name}: ${testAnswers2.subject}`)
})

test('concats the subject with emoji prefix formatted in non-conventional manner,\
if conventionalFormat option is not set', () => {
  const { testAnswers, config } = setup();
  const result = lib.formatTitle(testAnswers, config);
  expect(result).toEqual(`${testAnswers.type.emoji} ${testAnswers.subject}`)
})

test('concats the subject with emoji prefix formatted in conventional manner,\
if conventionalFormat option is not set', () => {
  const { testAnswers, config } = setup(null, { conventionalFormat: true });
  const result = lib.formatTitle(testAnswers, config);
  expect(result).toEqual(`${testAnswers.type.emoji} ${testAnswers.type.name}: ${testAnswers.subject}`)
})
