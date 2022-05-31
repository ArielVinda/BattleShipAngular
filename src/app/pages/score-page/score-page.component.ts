import { Component, OnDestroy, OnInit } from '@angular/core';
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
    public scoreService: ScoreService
  ) { }

  scoreServiceUnsubscribe: any;
  scoreList: Array<ScoreItem> = [];

  ngOnInit(): void {
    this.gameService.getGameState().subscribe((res) => {
      this.gameState = res;
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
