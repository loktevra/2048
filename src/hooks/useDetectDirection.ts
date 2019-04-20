import * as React from 'react';
import { gameCore } from '../core';
import { EDirections } from '../core/types';

const STEP_LENGTH = 80;

interface IStartCoords {
  startX?: number;
  startY?: number;
}

function changeCoordsOnStartMove(coords: IStartCoords, x: number, y: number) {
  coords.startX = x;
  coords.startY = y;
}

function changeCoordsOnEndMove(coords: IStartCoords, x: number, y: number) {
  const diffX = coords.startX - x;
  const diffY = coords.startY - y;
  const xAbs = Math.abs(diffX);
  const yAbs = Math.abs(diffY);
  if (xAbs > yAbs && xAbs > STEP_LENGTH) {
    gameCore.step(diffX < 0 ? EDirections.right : EDirections.left);
  } else if (yAbs > STEP_LENGTH) {
    gameCore.step(diffY < 0 ? EDirections.down : EDirections.up);
  }
}

function handlerCreatorMouseDown(coords: IStartCoords) {
  return (event: MouseEvent) => {
    console.log('handlerCreatorMouseDown', event);
    changeCoordsOnStartMove(coords, event.clientX, event.clientY);
  }
}

function handlerCreatorMouseUp(coords: IStartCoords) {
  return (event: MouseEvent) => {
    console.log('handlerCreatorMouseUp', event);
    changeCoordsOnEndMove(coords, event.clientX, event.clientY)
  }
}

function handlerCreatorTouchStart(coords: IStartCoords) {
  return (event: TouchEvent) => {
    console.log('handlerCreatorTouchStart', event);
    event.preventDefault();
    changeCoordsOnStartMove(coords, event.targetTouches[0].clientX, event.targetTouches[0].clientY);
  }
}

function handlerCreatorTouchEnd(coords: IStartCoords) {
  return (event: TouchEvent) => {
    console.log('handlerCreatorTouchEnd', event);
    event.preventDefault();
    changeCoordsOnEndMove(coords, event.changedTouches[0].clientX, event.changedTouches[0].clientY)
  }
}

/**
 * хук отслеживания движения мышью
 * движения меньше 80 пикселей отбрасываются как ложные срабатывания
 * если движение зафиксировано, вычисляется направление и вызывается метод для хода
 */
export function useDetectDirection() {
  const gameField = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const coords: IStartCoords = {
      startX: undefined,
      startY: undefined,
    }
    const handlerMouseDown = handlerCreatorMouseDown(coords);
    const handlerMouseUp = handlerCreatorMouseUp(coords);
    const handlerTouchStart = handlerCreatorTouchStart(coords);
    const handlerTouchEnd = handlerCreatorTouchEnd(coords);

    gameField.current.addEventListener('mousedown', handlerMouseDown)
    document.addEventListener('mouseup', handlerMouseUp)
    gameField.current.addEventListener('touchstart', handlerTouchStart)
    document.addEventListener('touchend', handlerTouchEnd)

    return function cleanup() {
      gameField.current.removeEventListener('mousedown', handlerMouseDown)
      document.removeEventListener('mouseup', handlerMouseUp)
      gameField.current.removeEventListener('touchstart', handlerTouchStart)
      document.removeEventListener('touchend', handlerTouchEnd)
    }
  });

  return gameField;
}
