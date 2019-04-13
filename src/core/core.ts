import { EDirections } from '../types';

let stepDirection: null | EDirections;

export function step(direction: EDirections) {
  console.log('direction', stepDirection, direction);
  
  stepDirection = direction;
}
