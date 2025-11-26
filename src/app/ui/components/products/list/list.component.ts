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
import { MockDataService } from 'src/app/services/common/models/mock-data.service';

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
    private router: Router,
    private mockDataService: MockDataService
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
    try {
      this.baseUrl = await this.fileService.getBaseStorageUrl();
    } catch (error) {
      // Fallback baseUrl for mock data
      this.baseUrl = { url: '' } as BaseUrl;
    }

    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      try {
        const data: { totalProductCount: number; products: List_Product[] } =
          await this.productService.list(
            this.currentPageNo - 1,
            this.pageSize,
            () => { },
            (errorMessage) => { }
          );

        this.products = data.products && data.products.length > 0
          ? data.products
          : this.getMockProductsForPage();

        this.products = this.products.map<List_Product>((p) => {
          const listProduct: List_Product = {
            id: p.id,
            createdDate: p.createdDate,
            path: p.productImageFile && p.productImageFile.length
              ? (p.productImageFile.find((t) => t.showcase)?.path || p.path || 'assets/product.png')
              : (p.path || 'assets/product.png'),
            name: p.name,
            price: p.price,
            stock: p.stock,
            updatedDate: p.updatedDate,
            productImageFile: p.productImageFile || [],
          };

          return listProduct;
        });

        this.totalProductCount = data.totalProductCount > 0
          ? data.totalProductCount
          : this.mockDataService.getMockProducts().length;
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      } catch (error) {
        // Fallback to mock data if API fails
        this.products = this.getMockProductsForPage();
        this.totalProductCount = this.mockDataService.getMockProducts().length;
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      }

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

  private getMockProductsForPage(): List_Product[] {
    const allMockProducts = this.mockDataService.getMockProducts();
    const startIndex = (this.currentPageNo - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return allMockProducts.slice(startIndex, endIndex);
  }
}
