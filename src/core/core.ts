import { EDirections, INumberBox } from '../types';

class GameCore {
  public setFieldStateHandlers = (
    setFieldState: (state: INumberBox[]) => void,
    getFieldState: () => INumberBox[],
  ) => {
    this.setFieldState = setFieldState;
    this.getFieldState = getFieldState;
  }

  public step = (direction: EDirections) => {
    const fieldState = this.getFieldState();
    const newFieldState = fieldState.map<INumberBox>(item => {
      if (direction === EDirections.right) {
        return {
          ...item,
          x: 3,
        }
      }
      if (direction === EDirections.left) {
        return {
          ...item,
          x: 0,
        }
      }
      if (direction === EDirections.up) {
        return {
          ...item,
          y: 0,
        }
      }
      if (direction === EDirections.down) {
        return {
          ...item,
          y: 3,
        }
      }
    });
    this.setFieldState(newFieldState)
  }

  private setFieldState: (state: INumberBox[]) => void;
  private getFieldState: () => INumberBox[];

}

export const gameCore = new GameCore();
