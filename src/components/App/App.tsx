import * as React from 'react';

import { Score } from '../Score';
import { GameField } from '../GameField';
import { PopupGameOver } from '../PopupGameOver';
import { ButtonNewGame } from '../ButtonNewGame';

import './App.scss';

export function App() {
  return (
    <div className="main">
      <h1>2048</h1>
      <div className="main__panel">
        <Score />
        <ButtonNewGame />
      </div>
      <GameField />
      <PopupGameOver />
    </div>
  )
}
