import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialogs } from '../base/base-dialogs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

import {
  DeleteDialogComponent,
  DeleteState,
} from '../delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $: any;
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialogs<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageSatate | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }
  myimages: List_Product_Image[];
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallBeat);
    this.myimages = await this.productService.readImages(
      this.data as string,
      () => this.spinner.hide(SpinnerType.BallBeat)
    );
  }
  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallBeat);
        await this.productService.deleteImage(
          this.data as string,
          imageId,
          () => {
            this.spinner.hide(SpinnerType.BallBeat);
            var card = $(event.srcElement).parent().parent();
            debugger;
            card.fadeOut(500);
          }
        );
      },
    });
  }
  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallBeat);

    this.productService.changeShowcaseImage(
      imageId,
      this.data as string,
      () => {
        this.spinner.hide(SpinnerType.BallBeat);
      }
    );
  }
  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .gif, .mp4',
    action: 'upload',
    controller: 'product',
    explanation: 'Select a photo(s) for the product',
    isAdminPage: true,
    queryString: 'id=' + this.data,
  };
}
export enum SelectProductImageSatate {
  Close,
}
