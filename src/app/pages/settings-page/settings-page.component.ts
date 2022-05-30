import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  form!: FormGroup;

  constructor(
    protected fb: FormBuilder
  ) { }

  get name() { return this.form.get('name'); }
  get turns() { return this.form.get('turns'); }

  setMode(val: number): void {
    this.form.patchValue({
      mode: val
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.maxLength(5), Validators.required]],
        turns: [10, [Validators.min(10), Validators.max(100)]],
        difficulty: ['E'],
        mode: [0]
      }
    );
  }

}
