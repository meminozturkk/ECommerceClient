import { Component, Inject } from '@angular/core';
import { BaseDialogs } from '../base/base-dialogs';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss'],
})
export class FileUploadDialogComponent extends BaseDialogs<FileUploadDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState
  ) {
    super(dialogRef);
  }
}
export enum FileUploadDialogState {
  Yes,
  No,
}
