import * as React from 'react';

import { NumberBox } from '../NumberBox';

import './GameField.css';

export function GameField() {
  return (
    <div className="game_field">
      <NumberBox x={0} y={0} degree={1}/>
    </div>
  )
}