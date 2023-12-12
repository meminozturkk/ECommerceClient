import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    public dialog: MatDialog,
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService
  ) {
    const img = renderer.createElement('img');
    img.setAttribute('src', 'assets/delete-24.png');
    img.setAttribute('style', 'cursor:pointer');
    img.width = 20;
    img.height = 20;
    renderer.appendChild(element.nativeElement, img);
  }
  @Input() id: string;
  @Input() controller: string;
  @Output() updateList: EventEmitter<any> = new EventEmitter();
  @HostListener('click')
  async onclick(afterClosed: any) {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService
        .delete(
          {
            controller: this.controller,
          },
          this.id
        )
        .subscribe(
          (data) => {
            $(td.parentElement).fadeOut(200, () => {
              this.updateList.emit();
              this.alertifyService.message('Item deleted succesfully', {
                messageType: MessageType.Success,
                position: Position.TopRight,
              });
            });
          },
          (errorResponse: HttpErrorResponse) => {
            this.alertifyService.message(
              'A problem occurred while deleting the item.',
              {
                messageType: MessageType.Error,
                position: Position.TopCenter,
              }
            );
          }
        );
    });
  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
