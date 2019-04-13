export enum EDirections {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

export type TPositionsCoords = 0 | 1 | 2 | 3;

export interface INumberBox {
  x: TPositionsCoords;
  y: TPositionsCoords;
  degree: number;
  key: string;
}
