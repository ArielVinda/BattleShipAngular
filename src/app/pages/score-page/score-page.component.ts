import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameRunningDialogComponent } from 'src/app/components/game-running-dialog/game-running-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { GameService, GameState } from 'src/app/services/game.service';
import { ScoreItem, ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit, OnDestroy {

  gameState!: GameState;

  constructor(
    public gameService: GameService,
    public scoreService: ScoreService,
    public router: Router,
    public dialog: DialogService
  ) { }

  scoreServiceUnsubscribe: any;
  scoreList: Array<ScoreItem> = [];

  openDialog() {
    this.dialog.open(GameRunningDialogComponent, { 
      data: 'Please finish the game before trying to see the Scores!', 
      config: {
        hasBackdrop: true
      }
    }).afterClosed().subscribe(()=> {
      this.router.navigate(['play']);
    });
  }

  ngOnInit(): void {
    this.gameService.getGameState().subscribe((res) => {
      this.gameState = res;
      if (this.gameState === GameState.ON || this.gameState ===  GameState.PAUSED) {
        this.openDialog();
      }
    });
    this.scoreServiceUnsubscribe = this.scoreService.getAllScores().subscribe((res)=> {
      console.log(res);
      this.scoreList = res;
    })
  }

  ngOnDestroy(): void {
    this.scoreServiceUnsubscribe
  }

}
