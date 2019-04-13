import { EDirections, INumberBox } from './types';
import { moveBoxesInField } from './moveBoxesInField';
import { generateNewNumberBox } from './generateNewNumberBox';
import { creatUniqId } from './creatUniqId';
import * as R from 'ramda';
import { fieldStateEqual } from './fieldStateEqual';

class GameCore {
  public setFieldStateHandlers = (
    setFieldState: (state: INumberBox[]) => void,
    getFieldState: () => INumberBox[],
  ) => {
    this.setFieldState = setFieldState;
    this.getFieldState = getFieldState;
  }

  public getInitField = (): INumberBox[] => [{
    x: 0,
    y: 0,
    degree: 1,
    key: creatUniqId(),
  }]

  public step = (direction: EDirections) => {
    const fieldState = this.getFieldState();
    const newFieldState = moveBoxesInField(fieldState, direction);
    
    if (fieldStateEqual(fieldState, newFieldState)) {
      return;
    }
    
    const nextState = [
      ...newFieldState,
      generateNewNumberBox(newFieldState),
    ];
    
    this.setFieldState(nextState)
  }

  private setFieldState: (state: INumberBox[]) => void;
  private getFieldState: () => INumberBox[];

}

export const gameCore = new GameCore();
