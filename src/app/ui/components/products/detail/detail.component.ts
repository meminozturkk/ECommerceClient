import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends BaseComponent implements OnInit {
  productId: string;
  product: any;
  quantity: number = 1;
  baseUrl: BaseUrl;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fileService: FileService,
    private basketService: BasketService,
    private customToastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }
  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.getProductById(this.productId);
  }
  async getProductById(productid: string) {
    const response = await this.productService.getById(productid);
    this.product = response;
    console.log(response);
    console.log(this.product);
  }
  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallBeat);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = this.productId;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallBeat);
    this.customToastrService.message(
      'Ürün sepete eklenmiştir.',
      'Sepete Eklendi',
      {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      }
    );
  }
}
