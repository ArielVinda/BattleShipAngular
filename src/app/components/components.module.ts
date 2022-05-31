import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item/nav-item.component';
import { BoardCellComponent } from './board-cell/board-cell.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './radio/radio.component';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    NavItemComponent,
    BoardCellComponent,
    ButtonComponent,
    InputComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectComponent,
    RadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  exports: [
    NavItemComponent,
    BoardCellComponent,
    ButtonComponent,
    InputComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectComponent,
    RadioComponent
  ]
})
export class ComponentsModule { }
