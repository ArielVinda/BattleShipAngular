import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() active: boolean = false;
  @Input() disabled: boolean = false;

  @Output('onClick') onClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
