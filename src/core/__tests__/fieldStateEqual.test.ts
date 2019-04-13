import { fieldStateEqual } from "../fieldStateEqual";
import { c } from "../__mocks__/helper";

describe('core fieldStateEqual', () => {
  it.each([
    [
      [c(0,0,1, '1')],
      [c(0,0,1, '1')],
    ],
    [
      [c(0,0,1, '1'), c(0,0,1, '2')],
      [c(0,0,1, '2'), c(0,0,1, '1')],
    ],
  ])('возвращает true для %j и %j', (prevState, nextState) => {
    expect(fieldStateEqual(prevState, nextState)).toEqual(true);
  });
  it.each([
    [
      [c(0,0,1, '1')],
      [c(0,3,1, '1')],
    ],

  ])('', (prevState, nextState) => {
    expect(fieldStateEqual(prevState, nextState)).toEqual(false);
  })
});
