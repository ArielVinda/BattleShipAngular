import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss']
})
export class BoardCellComponent implements OnInit {

  @Input() state: 'hit' | 'miss' | 'sunk' | 'untouched' = 'untouched';
  @Input() hasShip: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  canClick(): void {
    if (this.state === 'untouched') {
      this.onClick.emit();
    } else {
      console.log('can\'t click: cell state is', `\"${this.state}\"`);
    }
  }

}
