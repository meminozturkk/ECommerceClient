import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogs } from '../base/base-dialogs';

@Component({
  selector: 'app-complete-order-dialog',
  templateUrl: './complete-order-dialog.component.html',
  styleUrls: ['./complete-order-dialog.component.scss'],
})
export class CompleteOrderDialogComponent extends BaseDialogs<CompleteOrderDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CompleteOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState
  ) {
    super(dialogRef);
  }

  complete() {}
}

export enum CompleteOrderState {
  Yes,
  No,
}
