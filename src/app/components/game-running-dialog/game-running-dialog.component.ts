import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-game-running-dialog',
  templateUrl: './game-running-dialog.component.html',
  styleUrls: ['./game-running-dialog.component.scss']
})
export class GameRunningDialogComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public message: string
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
