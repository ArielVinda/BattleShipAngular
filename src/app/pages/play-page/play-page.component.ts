import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService, GameState, Result } from 'src/app/services/game.service';
import { BoardUtilsService, Ship, ShipState, Vec2 } from 'src/app/services/board-utils.service';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { GameFinishedDialogComponent } from 'src/app/components/game-finished-dialog/game-finished-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit, OnDestroy {

  debug: boolean = !environment.production;
  board: any;
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  name$!: Observable<string>;
  turns$!: Observable<number>;
  gameStateUnsubscribe!: Subscription;

  constructor(
    protected gameService: GameService,
    public dialog: DialogService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.gameStateUnsubscribe = this.gameService.getGameState().subscribe((res)=>{
      this.gameStarted = (res === GameState.ON);
      this.gameFinished = (res === GameState.FINISHED);
      this.checkGameEnded();
      this.board = this.gameService.getBoard();
    });
    this.runGame();
  }

  checkGameEnded() {
    if (this.gameFinished) {
      console.log('roses');
      let gameResult = this.gameService.getGameResult();
      let data;
      if (gameResult === Result.WIN) {
        data = {
          result: 'WIN',
          message: 'Congratulations! You sank all the ships!'
        }
      } else if (gameResult === Result.LOOSE) {
        data = {
          result: 'LOOSE',
          message: 'You\'re out of Turns left!'
        }
      }
      this.dialog.open(GameFinishedDialogComponent, {
        data: data,
        config: {
          hasBackdrop: true
        }
      }).afterClosed().subscribe((res) => {
        if (res === 'Again') {
          this.runGame();
        } else if (res === 'Scores') {
          this.router.navigate(['score']);
        }
      });
    }
  }

  runGame() {
    this.name$ = this.gameService.getName();
    this.turns$ = this.gameService.getTurns();
    this.gameService.gameStart();
  }

  ngOnDestroy(): void {
    if (this.gameStarted && !this.gameFinished) {
      this.gameService.gamePause();
    } else {
      this.gameService.gameEnd();
    }
    this.gameStateUnsubscribe.unsubscribe();
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
