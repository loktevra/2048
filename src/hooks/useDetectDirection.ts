import * as React from 'react';
import { gameCore } from '../core';
import { EDirections } from '../core/types';

const STEP_LENGTH = 80;

interface IStartCoords {
  startX?: number;
  startY?: number;
}

function handlerCreatorMouseDown(coords: IStartCoords) {
  return (event: MouseEvent) => {
    coords.startX = event.clientX;
    coords.startY = event.clientY;
  }
}

function handlerCreatorMouseUp(coords: IStartCoords) {
  return (event: MouseEvent) => {
    const diffX = coords.startX - event.clientX;
    const diffY = coords.startY - event.clientY;
    const xAbs = Math.abs(diffX);
    const yAbs = Math.abs(diffY);
    if (xAbs > yAbs && xAbs > STEP_LENGTH) {
      gameCore.step(diffX < 0 ? EDirections.right : EDirections.left);
    } else if (yAbs > STEP_LENGTH) {
      gameCore.step(diffY < 0 ? EDirections.down : EDirections.up);
    }
  }
}

export function useDetectDirection() {
  const gameField = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const coords: IStartCoords = {
      startX: undefined,
      startY: undefined,
    }
    const handlerMouseDown = handlerCreatorMouseDown(coords);
    const handlerMouseUp = handlerCreatorMouseUp(coords);

    gameField.current.addEventListener('mousedown', handlerMouseDown)
    document.addEventListener('mouseup', handlerMouseUp)

    return function cleanup() {
      gameField.current.removeEventListener('mousedown', handlerMouseDown)
      document.removeEventListener('mouseup', handlerMouseUp)
    }
  });

  return gameField;
}
