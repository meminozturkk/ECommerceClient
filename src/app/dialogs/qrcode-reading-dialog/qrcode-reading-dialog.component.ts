import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseDialogs } from '../base/base-dialogs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { SpinnerType } from 'src/app/base/base.component';
declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss'],
})
export class QrcodeReadingDialogComponent
  extends BaseDialogs<QrcodeReadingDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService
  ) {
    super(dialogRef);
  }

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;
  @ViewChild('txtName', { static: true }) txtName: ElementRef;
  @ViewChild('txtPrice', { static: true }) txtPrice: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e: any) {
    debugger;
    console.log(e);
    this.spinner.show(SpinnerType.BallBeat);
    const data: any = (e[0] as { value: string }).value;
    if (data != null && data != '') {
      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement)
        .value;
      const nameValue = (this.txtName.nativeElement as HTMLInputElement).value;
      const priceValue = (this.txtPrice.nativeElement as HTMLInputElement)
        .value;
      const updates: any = {};
      updates.id = jsonData.Id;
      if (nameValue) {
        updates.Name = nameValue;
      }
      if (stockValue) {
        updates.Stock = parseInt(stockValue);
      }
      if (priceValue) {
        updates.Price = parseFloat(priceValue);
      }

      console.log(updates);
      if (Object.keys(updates).length > 0) {
        this.productService.updateStockQrCodeToProduct(
          updates.id,
          updates.Stock,
          updates.Name,
          updates.Price,
          () => {
            $('#btnClose').click();
            this.toastrService.message(
              `${jsonData.Name} ürün bilgileri güncellenmiştir.`,
              'Ürün Başarıyla Güncellendi',
              {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              }
            );
            this.spinner.hide(SpinnerType.BallBeat);
          }
        );
      } else {
        this.toastrService.message(
          `Güncelleme için en az bir bilgi girilmelidir.`,
          'Güncelleme Başarısız',
          {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight,
          }
        );
        this.spinner.hide(SpinnerType.BallBeat);
      }
    }
  }
}
