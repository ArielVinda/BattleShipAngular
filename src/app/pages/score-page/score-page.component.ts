import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScoreItem, ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit, OnDestroy {

  constructor(
    public scoreService: ScoreService
  ) { }

  scoreServiceUnsubscribe: any;
  scoreList: Array<ScoreItem> = [];

  ngOnInit(): void {
    this.scoreServiceUnsubscribe = this.scoreService.getAllScores().subscribe((res)=> {
      console.log(res);
      this.scoreList = res;
    })
  }

  ngOnDestroy(): void {
    this.scoreServiceUnsubscribe
  }

}
