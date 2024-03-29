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

      this.productService.updateStockQrCodeToProduct(
        jsonData.Id,
        parseInt(stockValue),
        () => {
          $('#btnClose').click();
          this.toastrService.message(
            `${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`,
            'Stok Başarıyla Güncellendi',
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            }
          );

          this.spinner.hide(SpinnerType.BallBeat);
        }
      );
    }
  }
}
