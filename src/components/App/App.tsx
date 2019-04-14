import * as React from 'react';

import { Score } from '../Score';
import { GameField } from '../GameField';

import './App.scss';

export function App() {
  return (
    <div className="main">
      <h1>2048</h1>
      <Score />
      <GameField />
    </div>
  )
}