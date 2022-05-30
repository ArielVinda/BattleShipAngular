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

  board!: Array<Ship>;
  hitArray: Array<Vec2> = [];
  missArray: Array<Vec2> = [];

  constructor(
    protected gameService: GameService,
    protected bU: BoardUtilsService
  ) { }

  ngOnInit(): void {
    this.gameService.gameStart();
    this.board = this.gameService.getBoard();
    // console.log(this.checkShipCell({x: 4, y: 4}));
    console.log(this.board);
  }

  check(cell: Vec2, array: Array<Vec2>) {
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
    let index = this.bU.checkCellBussy(cell, this.board);
    if (index) {
      if (this.board[index].state === ShipState.SUNK) {
        return true;
      }
    }
    return false;
  }

  shoot(cell: Vec2) {
    let index = this.bU.checkCellBussy(cell, this.board); 
    if (index) {
      this.hitArray.push(cell);
      let ship = this.board[index]; 
      ship.hits++;
      if (ship.span === ship.hits) {
        ship.state = ShipState.SUNK;
      }
      console.log(this.board[index], ' at ', index);
      console.log('with: ', cell);
      console.log(this.hitArray);
    } else {
      this.missArray.push(cell);
    }
  }

  checkShipCell(cell: Vec2): boolean {
    return !!this.bU.checkCellBussy(cell, this.board);
  }

  asciiFromCharCode(charVal: number): string {
    return String.fromCharCode(charVal);
  }

}
