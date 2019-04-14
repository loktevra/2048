import * as R from 'ramda';
import { INumberBox } from './types';

/**
 * метод проверки что состояния игрового поля эквивалентны
 */
export function fieldStateEqual(prevState: INumberBox[], nextState: INumberBox[]) {
  const sortByKey = R.sortBy(R.prop('key'));

  return R.equals(sortByKey(prevState), sortByKey(nextState))
}
