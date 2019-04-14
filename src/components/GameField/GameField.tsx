import * as React from 'react';

import { NumberBox } from '../NumberBox';
import { useDetectDirection } from '../../hooks/useDetectDirection';
import { useFieldState } from '../../hooks/useFieldState';

import './GameField.scss';

export function GameField() {
  const gameField = useDetectDirection();
  const numberBoxes = useFieldState();

  return (
    <div
      ref={gameField}
      className="game_field"
    >
      {numberBoxes.map(({x,y, degree, key}) => (
        <NumberBox x={x} y={y} degree={degree} key={key} />
      ))}
    </div>
  )
}