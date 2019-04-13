import * as React from 'react';

import { INumberBox } from '../core/types';
import { gameCore } from '../core';

export function useFieldState(): INumberBox[] {
  const [fieldState, setFieldState] = React.useState<INumberBox[]>(gameCore.getInitField());

  gameCore.setFieldStateHandlers((state) => setFieldState(state), () => fieldState);

  return fieldState
}
