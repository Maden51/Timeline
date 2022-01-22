import Validator from '../validator';

test.each([
  ['32.144, -21.432', '32', '144', '-21', '432'],
  ['32,144, -21,432', '32', '144', '-21', '432'],
  ['32/144, -21/432', '32', '144', '-21', '432'],
  ['32:144, -21:432', '32', '144', '-21', '432'],
])(('Should be able separate with different signs'), (str, a, b, c, d) => {
  expect(Validator.parseInput(str)[0]).toBe(a);
  expect(Validator.parseInput(str)[1]).toBe(b);
  expect(Validator.parseInput(str)[2]).toBe(c);
  expect(Validator.parseInput(str)[3]).toBe(d);
});

test('parseCheck should return false when digits is not equaal 4', () => {
  const str = Validator.parseCheck([1, 2, 3]).result;
  expect(str).toBeFalsy();
});

test('parseCheck should return false when fractional part is less than 0', () => {
  const { result } = Validator.parseCheck([51, -32, 32, -5]);
  expect(result).toBeFalsy();
});

test.each([
  ['51.50851, −0.12572', '51', '50851', '0', '12572'],
  ['51.50851,−0.12572', '51', '50851', '0', '12572'],
  ['[51.50851, −0.12572]', '51', '50851', '0', '12572'],
])(('Should be able get right digits'), (str, a, b, c, d) => {
  expect(Validator.parseInput(str)[0]).toBe(a);
  expect(Validator.parseInput(str)[1]).toBe(b);
  expect(Validator.parseInput(str)[2]).toBe(c);
  expect(Validator.parseInput(str)[3]).toBe(d);
});
