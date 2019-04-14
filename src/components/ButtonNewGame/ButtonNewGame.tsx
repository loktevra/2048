import * as React from 'react';

import { gameCore } from '../../core';

import './ButtonNewGame.scss';

export function ButtonNewGame() {
  return (
    <button onClick={gameCore.startNewGame} className="button">Start new game</button>
  )
}
