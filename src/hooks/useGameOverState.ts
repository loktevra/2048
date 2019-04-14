import * as React from 'react';

import { gameCore } from '../core';

/**
 * хук для отслеживания окончания игры
 */
export function useGameOverState() {
  const [status, setStatus] = React.useState(false);
  const [score, setScore] = React.useState(0);

  gameCore.setGameOverHandlers((status: boolean, score: number) => {
    setStatus(status);
    setScore(score);
  });

  return {
    status,
    score,
    setStatus,
  };
}
