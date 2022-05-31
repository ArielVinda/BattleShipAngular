import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardUtilsService, Ship, ShipState, Vec2 } from './board-utils.service';
import { GeneratorService } from './generator.service';
import { ScoreService } from './score.service';

export enum GameState {
  ON = 'ON',
  OFF = 'OFF',
  PAUSED = 'PAUSED'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  state: GameState = GameState.OFF;
  name: string = '';
  board: Array<Ship> = [];
  turns: number = 100;
  score: number = 0;

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
    // check if game has ended
    this.checkTurns();
  }

  checkTurns() {
    if (this.turns === 0 && this.hitArray.length !== 20) {
      // if out of turns and haven't hit all the ship cells
      console.log('You loose!');
    } else if (this.hitArray.length === 20) {
      console.log('You win!');
      let score = this.hitArray.length - this.missArray.length;
      this.scoreService.writeScore({name: 'ARI', score: 3000});
      // write turns
      console.log(score);
    }
  }

  checkShipCell(cell: Vec2): boolean {
    return !!this.boardUtils.checkCellBussy(cell, this.board);
  }

  getBoard(): Array<Ship> {
    return this.board;
  }

  getGameState(): Observable<GameState> {
    return new Observable((observer) => {
      // sort by highest score, filter first 10
      observer.next(this.state);
      return {
        unsubscribe() {
          // clean up
        }
      }
    });
  }

  gameStart(): GameState {
    if (this.state === GameState.OFF) {
      // generate ships on board
      this.board = this.generatorService.generateBoard();
      
      // set state to ON
      this.state = GameState.ON;
    } else if (this.state === GameState.PAUSED) {
      // set state to ON
      this.state = GameState.ON;
    }
    return this.state;
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
