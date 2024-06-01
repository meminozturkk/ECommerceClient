import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private fileService: FileService
  ) {
    super(spinner);
  }
  productList: List_Product[];
  baseUrl: BaseUrl;

  bestSellers: any[];

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.startCarousel('carouselExampleIndicators');
    this.getProduct();
    this.getBestSeller();

    $('.carousel').carousel();
  }
  startCarousel(carouselId: string) {
    const carouselElement = document.getElementById(carouselId);
    if (carouselElement) {
      setInterval(() => {
        $('.carousel').carousel({
          interval: 2000,
        });
      });
    }
  }
  async getProduct() {
    this.productList = (await this.productService.list(0, 6)).products;
  }
  async getBestSeller() {
    this.bestSellers = await this.productService.getBestSellers();
    console.log(this.bestSellers);
  }
}
