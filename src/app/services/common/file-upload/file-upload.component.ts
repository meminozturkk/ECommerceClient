import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  messageSuccess: string = 'Files uploaded succesfully';
  messageWrong: string = "Files can't uploaded";
  constructor(
    private httpClientService: HttpClientService,
    private alterifyService: AlertifyService,
    private customToastrService: CustomToastrService
  ) {}
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClientService
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe(
        (data) => {
          if (this.options.isAdminPage) {
            this.alterifyService.message(this.messageSuccess, {
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          } else {
            this.customToastrService.message(this.messageSuccess, 'Success', {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            });
          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (this.options.isAdminPage) {
            this.alterifyService.message(this.messageWrong, {
              messageType: MessageType.Warning,
              position: Position.TopRight,
            });
          } else {
            this.customToastrService.message(this.messageWrong, 'Sorry', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight,
            });
          }
        }
      );
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
