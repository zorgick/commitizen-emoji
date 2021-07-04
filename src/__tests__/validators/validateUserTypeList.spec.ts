import utils from 'utils';

test('throws if one of required properties is missing', async () => {
  await expect(utils.validateUserTypeList([
    {
      name: '12',
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('emoji is a required field')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('name is a required field')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      code: ':code:'
    }
  ])).rejects.toThrowError('description is a required field')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: '12345',
    }
  ])).rejects.toThrowError('code is a required field')
})

test('throws if one of properties is of a wrong format', async () => {
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '1',
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('name must be at least 2 characters')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: '1234',
      code: ':code:'
    }
  ])).rejects.toThrowError('description must be at least 5 characters')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: '12345',
      code: 'code:'
    }
  ])).rejects.toThrowError('code must be of ":code:" format')
})

test('throws if one of properties is of a wrong type', async () => {
  await expect(utils.validateUserTypeList([
    {
      emoji: 1,
      name: '12',
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('emoji must be a `string` type')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: 1,
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('name must be a `string` type')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: 1,
      code: ':code:'
    }
  ])).rejects.toThrowError('description must be a `string` type')
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: '12345',
      code: 1
    }
  ])).rejects.toThrowError('code must be a `string` type')
})

test('shows the position in a list where a validation error happens', async () => {
  await expect(utils.validateUserTypeList([
    {
      emoji: '=)',
      name: '12',
      description: '12345',
      code: ':code:'
    },
    {
      emoji: 1,
      name: '12',
      description: '12345',
      code: ':code:'
    }
  ])).rejects.toThrowError('[1].emoji')
})
