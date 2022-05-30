import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { BoardUtilsService, Ship, ShipState, Vec2 } from 'src/app/services/board-utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit {

  debug: boolean = !environment.production;
  gameStarted = false;

  // hitArray!: Array<Vec2>;
  // missArray!: Array<Vec2>;

  constructor(
    protected gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.gameStart().subscribe((res)=>{
      console.log(res);
      this.gameStarted = res;
    });
    console.log('from play: ', this.gameService.getBoard());
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
