import { Injectable } from '@angular/core';
import { BehaviorSubject, ObjectUnsubscribedError, Observable, Subject } from 'rxjs';
import { BoardUtilsService, Ship, ShipState, Vec2 } from './board-utils.service';
import { GeneratorService } from './generator.service';
import { ScoreService } from './score.service';
import { SettingsService } from './settings.service';

export enum GameState {
  ON = 'ON',
  OFF = 'OFF',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED'
}

export enum Result {
  WIN = 'WIN',
  LOOSE = 'LOOSE'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  state: GameState = GameState.OFF;
  stateSubject: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.OFF);

  name: string = '';
  nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  maxTurns!: number;
  turns: number = 100;
  turnsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  gameResult!: Result;
  gameResultSubject: Subject<Result> = new Subject<Result>();

  getName(): BehaviorSubject<string> {
    return this.nameSubject;
  }

  getTurns(): BehaviorSubject<number> {
    return this.turnsSubject;
  }

  board: Array<Ship> = [];
  score: number = 0;

  hitArray: Array<Vec2> = [];
  missArray: Array<Vec2> = [];

  constructor(
    public settingsService: SettingsService,
    public generatorService: GeneratorService,
    public boardUtils: BoardUtilsService,
    public scoreService: ScoreService
  ) { }

  private check(cell: Vec2, array: Array<Vec2>) {
    // can't compare value of object with Array.includes(cell), 
    // so I'm filtering and checking length of result array
    let result = array.filter((item) => {
      return (
        item.x === cell.x &&
        item.y === cell.y
      );
    }); 
    return !!result.length;
  }

  getGameResult(): Result {
    return this.gameResult;
  }

  checkMiss(cell: Vec2) {
    return this.check(cell, this.missArray);
  }

  checkHit(cell: Vec2) {
    return this.check(cell, this.hitArray);
  }

  checkSunk(cell: Vec2) {
    let indexPlusOne = this.boardUtils.checkCellBussy(cell, this.board);
    if (indexPlusOne) {
      if (this.board[indexPlusOne - 1].state === ShipState.SUNK) {
        return true;
      }
    }
    return false;
  }

  shoot(cell: Vec2) {
    // save indexPlusOne due to an error with 0 = falsy
    let indexPlusOne = this.boardUtils.checkCellBussy(cell, this.board);
    if (indexPlusOne) {
      // if there's an index, there was a hit
      // push to hitArray
      this.hitArray.push(cell);
      // select ship and add 1 to hit property
      let ship = this.board[indexPlusOne - 1]; 
      ship.hits++;
      // check if ship is sunk
      if (ship.span === ship.hits) {
        ship.state = ShipState.SUNK;
      }
    } else {
      // push cell to missArray
      this.missArray.push(cell);
    }
    // substract one from turns
    this.turns--;
    this.turnsSubject.next(this.turns);
    // check if game has ended
    this.checkTurns();
  }

  checkTurns() {
    if (this.turns === 0 && this.hitArray.length !== 20) {
      // if out of turns and haven't hit all the ship cells
      console.log('You loose!');
      this.gameResult = Result.LOOSE;
      this.gameResultSubject.next(this.gameResult);
      this.gameFinished();
    } else if (this.hitArray.length === 20) {
      console.log('You win!');
      let score = (this.hitArray.length - (this.missArray.length * (20 / this.maxTurns))) * 1000;
      this.scoreService.writeScore({name: this.name, score: score});
      this.gameResult = Result.WIN;
      this.gameResultSubject.next(this.gameResult);
      this.gameFinished();
    }
  }

  checkShipCell(cell: Vec2): boolean {
    return !!this.boardUtils.checkCellBussy(cell, this.board);
  }

  getBoard(): Array<Ship> {
    return this.board;
  }

  getGameState(): BehaviorSubject<GameState> {
    return this.stateSubject;
  }

  gameStart(): GameState {
    if (this.state === GameState.OFF || this.state === GameState.FINISHED) {
      // clear arrays
      this.hitArray = [];
      this.missArray = [];
      // generate ships on board
      this.board = this.generatorService.generateBoard();
      
      // set state to ON
      this.state = GameState.ON;
      this.stateSubject.next(this.state);

      // get player and settings data
      this.settingsService.getSettings().subscribe((settings) => {
        this.name = settings.name;
        this.nameSubject.next(this.name);
        this.turns = settings.maxTurns;
        this.turnsSubject.next(this.turns);
        this.maxTurns = settings.maxTurns;
      });
    } else if (this.state === GameState.PAUSED) {
      // set state to ON
      this.state = GameState.ON;
      this.stateSubject.next(this.state);
    }
    return this.state;
  }
  gameEnd() {
    // clean board
    this.board = [];
    // set state to OFF
    this.state = GameState.OFF;
    this.stateSubject.next(this.state);
  }
  gamePause() {
    // set state to PAUSED
    this.state = GameState.PAUSED;
    this.stateSubject.next(this.state);
  }
  gameFinished() {
    // set state to FINISHED
    this.state = GameState.FINISHED;
    this.stateSubject.next(this.state);
  }
}
