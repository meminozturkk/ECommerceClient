import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../../../contracts/base_url';
import { List_Product } from '../../../../contracts/list_product';
import { FileService } from '../../../../services/common/models/file.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { Create_Basket_Item } from 'src/app/contracts/create_basket_item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService,
    private router: Router
  ) {
    super(spinner);
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      const data: { totalProductCount: number; products: List_Product[] } =
        await this.productService.list(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );

      this.products = data.products;

      this.products = this.products.map<List_Product>((p) => {
        debugger;
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          path: p.productImageFile.length
            ? p.productImageFile.find((t) => t.showcase).path
            : '',
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFile: p.productImageFile,
        };

        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= Math.min(7, this.totalPageCount); i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (
          let i = Math.max(1, this.totalPageCount - 6);
          i <= this.totalPageCount;
          i++
        ) {
          this.pageList.push(i);
        }
      } else {
        for (
          let i = this.currentPageNo - 3;
          i <= Math.min(this.currentPageNo + 3, this.totalPageCount);
          i++
        ) {
          this.pageList.push(i);
        }
      }
    });
  }
  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallBeat);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
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
  goToProductDetail(productId: string): void {
    this.router.navigate(['/products/detail', productId]);
  }
}
