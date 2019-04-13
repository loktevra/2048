import * as React from 'react';
import { useScoreState } from '../../hooks/useScoreState';

export function Score() {
  const score = useScoreState();
  return (
    <div>
      Score: <span>{score}</span>
    </div>
  )
}
