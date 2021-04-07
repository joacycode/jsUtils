import { _extend } from '../src/index'
const { strTrim, strChangeCase, strCheckPwd, numRandom } = _extend
test('str-trim test', () => {
  expect(strTrim(' tes tt rim ', 1)).toBe('testtrim')
  expect(strTrim(' tes tt rim ', 2)).toBe('tes tt rim')
  expect(strTrim(' tes tt rim ', 3)).toBe('tes tt rim ')
  expect(strTrim(' tes tt rim ', 4)).toBe(' tes tt rim')
})
test('str-changecase test', () => {
  expect(strChangeCase('changecase', 1)).toBe('Changecase')
  expect(strChangeCase('CHANGECASE', 2)).toBe('cHANGECASE')
  expect(strChangeCase('changecase', 3)).toBe('CHANGECASE')
  expect(strChangeCase('ChangeCase', 4)).toBe('CHANGECASE')
  expect(strChangeCase('ChangeCase', 5)).toBe('changecase')
})
test('str-checkpwd test', () => {
  expect(strCheckPwd('aabbc')).toBe(0)
  expect(strCheckPwd('12345678')).toBe(1)
  expect(strCheckPwd('aaaa1111')).toBe(2)
  expect(strCheckPwd('Aaaa1234')).toBe(3)
  expect(strCheckPwd('Aaaa1234@4321')).toBe(4)
})

test('num-random test', () => {
  expect(numRandom(1, 2)).toBeGreaterThanOrEqual(1)
})
