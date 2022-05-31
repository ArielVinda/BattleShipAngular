import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScoreItem {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoreList: Array<ScoreItem> = [
    {
      name: "AAA",
      score: 1000
    },
    {
      name: "AAB",
      score: 900
    },
    {
      name: "AAC",
      score: 800
    },
    {
      name: "AAD",
      score: 700
    },
    {
      name: "AAE",
      score: 600
    },
    {
      name: "AAF",
      score: 500
    },
    {
      name: "AAG",
      score: 400
    },
    {
      name: "AAH",
      score: 300
    },
    {
      name: "AAI",
      score: 200
    },
    {
      name: "AAJ",
      score: 100
    },
    {
      name: "AAK",
      score: 10
    },
    {
      name: "AAL",
      score: 0
    }
  ];

  constructor() { }
  
  writeScore(item: ScoreItem): void {
    this.scoreList.push(item);
  }
  getAllScores(): Observable<Array<ScoreItem>> {
    return new Observable((observer) => {
      // sort by highest score, filter first 10
      observer.next(this.scoreList.sort((a, b)=>{ return b.score - a.score ;}).filter((item, index) => { return index < 10;}));
      return {
        unsubscribe() {
          // clean up
        }
      }
    });
  }
}
