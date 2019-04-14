import { EDirections, INumberBox } from './types';
import { moveBoxesInField } from './moveBoxesInField';
import { generateNewNumberBox } from './generateNewNumberBox';
import { creatUniqId } from './creatUniqId';
import { fieldStateEqual } from './fieldStateEqual';

class GameCore {
  /**
   * ядро не хранит состояине игрового поля,
   * поэтому нам нужно проинициализировать сеттеры и геттеры
   */
  public setFieldStateHandlers = (
    setFieldState: (state: INumberBox[]) => void,
    getFieldState: () => INumberBox[],
  ) => {
    this.setFieldState = setFieldState;
    this.getFieldState = getFieldState;
  }

  /**
   * ядро не хранит состояние очков,
   * поэтому нам нужно проинициализировать сеттеры и геттеры
   */
  public setScoreStateHandlers = (
    setScoreState: (sum: number) => void,
    getScoreState: () => number,
  ) => {
    this.setScoreState = setScoreState;
    this.getScoreState = getScoreState;
  }

  /**
   * Так эе необходимо указать коллбэк
   * который вызываем по окончанию игры
   */
  public setGameOverHandlers = (
    setGameOverState: (status: boolean, score: number) => void,
  ) => {
    this.setGameOverState = setGameOverState;
  }

  /**
   * метод для инициализации состояния игрового поля
   */
  public getInitField = (): INumberBox[] => [{
    x: 0,
    y: 0,
    degree: 1,
    key: creatUniqId(),
  }]

  /**
   * метод для инициализации новой игры
   * тут мы вызываем методы для обнудения состояний
   */
  public startNewGame = () => {
    this.setGameOverState(false);
    this.setScoreState(0);
    this.setFieldState(this.getInitField());
  }

  /**
   * метод обработки шага
   */
  public step = (direction: EDirections) => {
    if (this.blockedSetps) {
      return;
    }
    this.blockedSetps = true;
    
    const fieldState = this.getFieldState();
    const newFieldState = moveBoxesInField(
      fieldState,
      direction,
      (add: number) => this.setScoreState(this.getScoreState() + add),
    );
    
    if (fieldStateEqual(fieldState, newFieldState)) {
      this.blockedSetps = false;

      return;
    }

    const nextState = [
      ...newFieldState,
      generateNewNumberBox(newFieldState),
    ];
    
    this.setFieldState(nextState)    

    // проверяем что ходить еще возможно, инче конец игры
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

  /**
   * метод проверки, что ходы еще возможны
   */
  private testNextStepExist = () => {
    const fieldState = this.getFieldState();
    for(let dir in EDirections) {
      const stateLength = moveBoxesInField(fieldState, dir as EDirections).length;
      if (stateLength < 16) {
        return true;
      }
    }
  }
}

export const gameCore = new GameCore();
