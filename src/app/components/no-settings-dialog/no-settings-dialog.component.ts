import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-no-settings-dialog',
  templateUrl: './no-settings-dialog.component.html',
  styleUrls: ['./no-settings-dialog.component.scss']
})
export class NoSettingsDialogComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
