import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, NgxFileDropModule, DialogsModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
