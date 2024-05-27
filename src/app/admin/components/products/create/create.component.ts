import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyservice: AlertifyService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'product',
    explanation: 'Choose the photos',
    isAdminPage: true,
    accept: '.png, .jpg, .jpeg, .mp4',
  };
  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallBeat);

    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    if (create_product.name || create_product.stock || create_product.price) {
      this.productService.create(
        create_product,
        () => {
          this.hideSpinner(SpinnerType.BallBeat);
          this.alertifyservice.message('Product Created Successfully', {
            messageType: MessageType.Success,
            position: Position.TopRight,
          });
          this.createdProduct.emit(create_product);
        },
        (errorMessage) => {
          this.alertifyservice.message(errorMessage, {
            messageType: MessageType.Error,
            position: Position.TopRight,
          });
        }
      );
    } else {
      this.alertifyservice.message(
        'Ürün oluşturmak için bütün alanlar dolu olmalıdır',
        {
          messageType: MessageType.Error,
          position: Position.TopRight,
        }
      );
    }
  }
}
