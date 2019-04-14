import { EDirections, INumberBox } from './types';
import { moveBoxesInField } from './moveBoxesInField';
import { generateNewNumberBox } from './generateNewNumberBox';
import { creatUniqId } from './creatUniqId';
import { fieldStateEqual } from './fieldStateEqual';

class GameCore {
  public setFieldStateHandlers = (
    setFieldState: (state: INumberBox[]) => void,
    getFieldState: () => INumberBox[],
  ) => {
    this.setFieldState = setFieldState;
    this.getFieldState = getFieldState;
  }
  public setScoreStateHandlers = (
    setScoreState: (sum: number) => void,
    getScoreState: () => number,
  ) => {
    this.setScoreState = setScoreState;
    this.getScoreState = getScoreState;
  }

  public setGameOverHandlers = (
    setGameOverState: (status: boolean, score: number) => void,
  ) => {
    this.setGameOverState = setGameOverState;
  }

  public getInitField = (): INumberBox[] => [{
    x: 0,
    y: 0,
    degree: 1,
    key: creatUniqId(),
  }]

  public step = (direction: EDirections) => {
    if (this.blockedSetps) {
      return;
    }
    this.blockedSetps = true;

    const fieldState = this.getFieldState();
    const newFieldState = moveBoxesInField(fieldState, direction, this.setScoreState);
    
    if (fieldStateEqual(fieldState, newFieldState)) {
      this.blockedSetps = false;

      return;
    }

    const nextState = [
      ...newFieldState,
      generateNewNumberBox(newFieldState),
    ];
    
    this.setFieldState(nextState)    

    if (nextState.length === 16) {
      const nextStepExist = this.testNextStepExist();
      if (!nextStepExist) {
        this.gameOver();
      }
    }

    setTimeout(() => {

      this.blockedSetps = false;
    }, 500);
    
  }

  private blockedSetps: boolean = false;

  private setFieldState: (state: INumberBox[]) => void;
  private getFieldState: () => INumberBox[];

  private setScoreState: (sum: number) => void;
  private getScoreState: () => number;

  private setGameOverState: (status: boolean, score?: number) => void;

  private gameOver = () => {
    this.setGameOverState(true, this.getScoreState());
  }

  private startNewGame = () => {
    this.setGameOverState(false);
    this.setScoreState(0);
    this.setFieldState(this.getInitField());
  }

  private testNextStepExist = () => {
    const fieldState = this.getFieldState();
    for(let dir in EDirections) {
      const stateLength = moveBoxesInField(fieldState, dir as EDirections, this.setScoreState).length;
      if (stateLength < 16) {
        return true;
      }
    }
  }
}

export const gameCore = new GameCore();
