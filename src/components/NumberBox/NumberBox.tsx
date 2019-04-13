import * as React from 'react';

import './NumberBox.css';

type TPositionsCoords = 0 | 1 | 2 | 3;

interface INumberBoxProps {
  x: TPositionsCoords;
  y: TPositionsCoords;
  degree: number;
}

export function NumberBox(props: INumberBoxProps) {
  const {
    x,
    y,
    degree,
  } = props;

  return (
    <div
      className={[
        'number_box',
        `number_box-position_x_${x}`,
        `number_box-position_y_${y}`,
        `number_box-degree_${degree}`,
      ].join(' ')}
    >
      {Math.pow(2, degree)}
    </div>
  )
}