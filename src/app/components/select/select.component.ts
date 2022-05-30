import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface NameValueInterface {
  name: string;
  value: string;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => SelectComponent
      ),
      multi: true
    }
  ]
})

export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() label: string = '';
  @Input() options: Array<NameValueInterface> = [];

  public value!: any;
  public changed!: ((value: any) => void);
  public touched!: (() => void);
  public isDisabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  };

}
