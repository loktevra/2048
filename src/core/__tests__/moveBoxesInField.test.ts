import { moveBoxesInField } from '../moveBoxesInField';
import { EDirections } from '../types';
import { testsForDirectionRight } from '../__mocks__/testsForDirectionRight';
import { testsForDirectionDown } from '../__mocks__/testsForDirectionDown';
import { testsForDirectionLeft } from '../__mocks__/testsForDirectionLeft';
import { testsForDirectionUp } from '../__mocks__/testsForDirectionUp';

describe('core moveBoxesInField', () => {
  it.each(testsForDirectionRight)('при движении вправо меняет расположение квадратов с %o, на %o', (input, expected) => {
    expect(moveBoxesInField(input, EDirections.right)).toEqual(expected);
  })
  it.each(testsForDirectionLeft)('при движении влево меняет расположение квадратов с %o, на %o', (input, expected) => {
    expect(moveBoxesInField(input, EDirections.left)).toEqual(expected);
  })
  it.each(testsForDirectionUp)('при движении вверх меняет расположение квадратов с %o, на %o', (input, expected) => {
    expect(moveBoxesInField(input, EDirections.up)).toEqual(expected);
  })
  it.each(testsForDirectionDown)('при движении вниз меняет расположение квадратов с %o, на %o', (input, expected) => {
    expect(moveBoxesInField(input, EDirections.down)).toEqual(expected);
  })
});
