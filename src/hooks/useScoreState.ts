import * as React from 'react';
import { gameCore } from '../core';

export function useScoreState() {
  const [scoreState, setScoreState] = React.useState(0);

  gameCore.setScoreStateHandlers((addSum: number) => setScoreState(scoreState + addSum), () => scoreState);

  return scoreState;
}
