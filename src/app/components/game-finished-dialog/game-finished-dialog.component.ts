import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-game-finished',
  templateUrl: './game-finished-dialog.component.html',
  styleUrls: ['./game-finished-dialog.component.scss']
})
export class GameFinishedDialogComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: {result: string, message: string}
  ) { }

  ngOnInit(): void {
  }

  close(data: string): void {
    this.dialogRef.close(data);
  }

}
