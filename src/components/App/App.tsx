import * as React from 'react';

import { GameField } from '../GameField';

import './App.css';

export function App() {
  return (
    <div className="main">
      <h1>2048</h1>
      <GameField />
    </div>
  )
}