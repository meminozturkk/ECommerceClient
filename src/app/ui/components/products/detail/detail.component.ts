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
import { MockDataService } from 'src/app/services/common/models/mock-data.service';

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
    spinner: NgxSpinnerService,
    private mockDataService: MockDataService
  ) {
    super(spinner);
  }
  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    try {
      this.baseUrl = await this.fileService.getBaseStorageUrl();
    } catch (error) {
      // Fallback baseUrl for mock data
      this.baseUrl = { url: '' } as BaseUrl;
    }
    this.getProductById(this.productId);
  }
  async getProductById(productid: string) {
    this.showSpinner(SpinnerType.BallBeat);
    try {
      const response = await this.productService.getById(productid);
      this.product = response.product || response;
    } catch (error) {
      // Fallback to mock data if API fails
      const mockProduct = this.mockDataService.getMockProductById(productid);
      this.product = mockProduct;
    } finally {
      this.hideSpinner(SpinnerType.BallBeat);
    }
  }
  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price) + ' ₺';
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
