import * as React from 'react';

import { NumberBox } from '../NumberBox';
import { useDetectDirection } from '../../hooks/useDetectDirection';

import './GameField.css';

export function GameField() {
  const gameField = useDetectDirection();

  return (
    <div
      ref={gameField}
      className="game_field"
    >
      <NumberBox x={0} y={0} degree={1}/>
    </div>
  )
}