import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardUtilsService, Ship, ShipState, Vec2 } from './board-utils.service';
import { GeneratorService } from './generator.service';
import { ScoreService } from './score.service';

export enum GameState {
  ON,
  OFF,
  PAUSED // I don't think i'm going to use it
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  state: GameState = GameState.OFF;
  board: Array<Ship> = [];

  hitArray: Array<Vec2> = [];
  missArray: Array<Vec2> = [];

  constructor(
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
    console.log(this.board);
    let indexPlusOne = this.boardUtils.checkCellBussy(cell, this.board);
    if (indexPlusOne) {
      this.hitArray.push(cell);
      let ship = this.board[indexPlusOne - 1]; 
      ship.hits++;
      if (ship.span === ship.hits) {
        ship.state = ShipState.SUNK;
      }
      console.log(this.board[indexPlusOne - 1], ' at ', indexPlusOne - 1);
      console.log('with: ', cell);
      console.log(this.hitArray);
    } else {
      this.missArray.push(cell);
    }
  }

  checkShipCell(cell: Vec2): boolean {
    return !!this.boardUtils.checkCellBussy(cell, this.board);
  }

  getBoard(): Array<Ship> {
    return this.board;
  }

  getGameState(): GameState {
    return this.state;
  }

  gameStart(): Observable<boolean> {
    // generate ships on board
    this.board = this.generatorService.generateBoard();
    console.log(this.board);
    
    // set state to ON
    this.state = GameState.ON;
    return new Observable((observer) => {
      observer.next(this.state === GameState.ON);
      return {
        unsubscribe() {
          // clean up
        }
      }
    });
  }
  gameEnd() {
    // clean board

    // set state to OFF
    this.state = GameState.OFF;
  }
  gamePause() {
    // set state to PAUSED
    this.state = GameState.PAUSED;
  }
}
