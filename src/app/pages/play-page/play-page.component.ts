import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService, GameState } from 'src/app/services/game.service';
import { BoardUtilsService, Ship, ShipState, Vec2 } from 'src/app/services/board-utils.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit, OnDestroy {

  debug: boolean = !environment.production;
  board: any;
  gameStarted: boolean = false;

  constructor(
    protected gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.gameStart();
    this.gameService.getGameState().subscribe((res)=>{
      console.log(res);
      this.gameStarted = (res === GameState.ON);
      this.board = this.gameService.getBoard();
    });
  }

  ngOnDestroy(): void {
    if (this.gameStarted) {
      this.gameService.gamePause();
    }
  }

  checkMiss(cell: Vec2) {
    return this.gameService.checkMiss(cell);
  }

  checkHit(cell: Vec2) {
    return this.gameService.checkHit(cell);
  }

  checkSunk(cell: Vec2) {
    return this.gameService.checkSunk(cell);
  }

  shoot(cell: Vec2) {
    this.gameService.shoot(cell);
  }

  checkShipCell(cell: Vec2): boolean {
    return this.gameService.checkShipCell(cell);
  }

  asciiFromCharCode(charVal: number): string {
    return String.fromCharCode(charVal);
  }

}
