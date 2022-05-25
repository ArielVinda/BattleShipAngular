import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item/nav-item.component';
import { BoardCellComponent } from './board-cell/board-cell.component';



@NgModule({
  declarations: [
    NavItemComponent,
    BoardCellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavItemComponent,
    BoardCellComponent
  ]
})
export class ComponentsModule { }
