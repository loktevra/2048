import * as React from 'react';
import * as R from 'ramda';

import { INumberBox } from '../core/types';
import { gameCore } from '../core';

/**
 * хук для харанения состояния игрового поля
 * так же навешивает хендлеры для игрового ядра
 */
export function useFieldState(): INumberBox[] {
  const [fieldState, setFieldState] = React.useState<INumberBox[]>(gameCore.getInitField());

  gameCore.setFieldStateHandlers((state) => setFieldState(state), () => fieldState);

  return R.sortBy(R.prop('key'), fieldState);
}
