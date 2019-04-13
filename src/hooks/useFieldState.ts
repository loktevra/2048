import * as React from 'react';

import { INumberBox } from '../types';
import { gameCore } from '../core';

const creatUniqId = (function() {
  let i = 1;

  return () => String(i++);
})()

export function useFieldState(): INumberBox[] {
  const [fieldState, setFieldState] = React.useState<INumberBox[]>([{
    x: 0,
    y: 0,
    degree: 1,
    key: creatUniqId(),
  }]);

  gameCore.setFieldStateHandlers((state) => setFieldState(state), () => fieldState);

  return fieldState
}
