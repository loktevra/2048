import * as R from 'ramda';

import { INumberBox, EDirections } from './types';

const mapSortFunc: { [key: string]: (a: INumberBox, b: INumberBox) => number} = {
  [EDirections.right]: (a, b) => a.x >= b.x ? -1 : 1,
  [EDirections.left]: (a, b) => a.x <= b.x ? -1 : 1,
  [EDirections.up]: (a, b) => a.y <= b.y ? -1 : 1,
  [EDirections.down]: (a, b) => a.y >= b.y ? -1 : 1,
}

const mapFindFunc: { [key: string]: any} = {
  [EDirections.right]: (fromBox: INumberBox) => R.findLast((box: INumberBox) => box.x > fromBox.x && box.y === fromBox.y),
  [EDirections.left]: (fromBox: INumberBox) => R.findLast((box: INumberBox) => box.x < fromBox.x && box.y === fromBox.y),
  [EDirections.up]: (fromBox: INumberBox) => R.findLast((box: INumberBox) => box.y < fromBox.y && box.x === fromBox.x),
  [EDirections.down]: (fromBox: INumberBox) => R.findLast((box: INumberBox) => box.y > fromBox.y && box.x === fromBox.x),
}

const mapPushToBox: { [key: string]: (fromBox: INumberBox, toBox: INumberBox) => INumberBox } = {
  [EDirections.right]: (fromBox: INumberBox, toBox: INumberBox) => ({...fromBox, x: toBox.x - 1} as INumberBox),
  [EDirections.left]: (fromBox: INumberBox, toBox: INumberBox) => ({...fromBox, x: toBox.x + 1} as INumberBox),
  [EDirections.up]: (fromBox: INumberBox, toBox: INumberBox) => ({...fromBox, y: toBox.y + 1} as INumberBox),
  [EDirections.down]: (fromBox: INumberBox, toBox: INumberBox) => ({...fromBox, y: toBox.y - 1} as INumberBox),
}

const mapPushToEdge: { [key: string]: (fromBox: INumberBox) => INumberBox } = {
  [EDirections.right]: (fromBox: INumberBox) => ({...fromBox, x: 3} as INumberBox),
  [EDirections.left]: (fromBox: INumberBox) => ({...fromBox, x: 0} as INumberBox),
  [EDirections.up]: (fromBox: INumberBox) => ({...fromBox, y: 0} as INumberBox),
  [EDirections.down]: (fromBox: INumberBox) => ({...fromBox, y: 3} as INumberBox),
}

export function moveBoxesInField(fieldState: INumberBox[], direction: EDirections, addScore: (sum: number) => void): INumberBox[] {
  let newState: INumberBox[] = [];
  fieldState
    .sort(mapSortFunc[direction])
    .forEach((fromBox) => {
      const { key, degree} = fromBox;
      const toBox = mapFindFunc[direction](fromBox)(newState);
      if (toBox) {
        if (toBox.degree === degree) {
          toBox.key = key;
          toBox.degree = degree + 1;
          addScore(Math.pow(2, toBox.degree));
        } else {
          newState.push(mapPushToBox[direction](fromBox, toBox));
        }
      } else {
        newState.push(mapPushToEdge[direction](fromBox));
      }
    })
  
  return newState
}
