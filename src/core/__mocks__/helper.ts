import { TPositionsCoords } from '../types';


export function c(x: TPositionsCoords, y: TPositionsCoords, degree: number, key: string) {
  return {
    x, y, degree, key,
  }
}
