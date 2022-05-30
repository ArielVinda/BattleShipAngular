import { Injectable } from '@angular/core';
import { Ship } from './board-utils.service';
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

  constructor(
    public generatorService: GeneratorService,
    public scoreService: ScoreService
  ) { }

  getBoard(): Array<Ship> {
    return this.generatorService.getBoard();
  }

  getGameState(): GameState {
    return this.state;
  }

  gameStart() {
    // set state to ON
    this.state = GameState.ON;
    // generate boats on board
    this.generatorService.generateBoard();
    // this.generatorService.generateShip(4);
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
