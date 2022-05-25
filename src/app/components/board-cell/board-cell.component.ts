import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss']
})
export class BoardCellComponent implements OnInit {

  @Input() state: 'hit' | 'miss' | 'sunk' | 'untouched' = 'untouched';

  constructor() { }

  ngOnInit(): void {
  }

}
