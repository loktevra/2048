import * as R from 'ramda';
import { INumberBox, TPositionsCoords } from './types';
import { creatUniqId } from './creatUniqId';

const map: TPositionsCoords[][] = [
  [0,0], [0,1], [0,2], [0,3],
  [1,0], [1,1], [1,2], [1,3],
  [2,0], [2,1], [2,2], [2,3],
  [3,0], [3,1], [3,2], [3,3],
]

function getRandom(max: number) {
  let rand = Math.random() * max;
  rand = Math.floor(rand);

  return rand;
}

/**
 * метод, генерирующий плитку на свободном месте поля
 */
export function generateNewNumberBox(fieldState: INumberBox[]): INumberBox {
  const newMapOfEmptyBoxes = R.difference(R.clone(map), fieldState.map(({ x, y}) => [x, y]));
  const randomIndex = getRandom(newMapOfEmptyBoxes.length)

  return {
    x: newMapOfEmptyBoxes[randomIndex][0],
    y: newMapOfEmptyBoxes[randomIndex][1],
    degree: getRandom(100) > 90 ? 2 : 1,
    key: creatUniqId(),
  }
}
