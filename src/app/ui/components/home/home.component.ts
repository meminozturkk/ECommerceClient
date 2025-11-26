import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { MockDataService } from 'src/app/services/common/models/mock-data.service';
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
    private fileService: FileService,
    private router: Router,
    private mockDataService: MockDataService
  ) {
    super(spinner);
  }
  productList: List_Product[];
  baseUrl: BaseUrl;

  bestSellers: any[];

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    try {
      this.baseUrl = await this.fileService.getBaseStorageUrl();
    } catch (error) {
      // Fallback baseUrl for mock data
      this.baseUrl = { url: '' } as BaseUrl;
    }
    this.startCarousel('carouselExampleIndicators');
    this.getProduct();
    this.getBestSeller();

    $('.carousel').carousel();
    this.hideSpinner(SpinnerType.BallScaleMultiple);
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
    try {
      const response = await this.productService.list(0, 6);
      this.productList = response.products && response.products.length > 0
        ? response.products
        : this.mockDataService.getMockProducts().slice(0, 6);
    } catch (error) {
      // Fallback to mock data if API fails
      this.productList = this.mockDataService.getMockProducts().slice(0, 6);
    }
  }
  async getBestSeller() {
    try {
      this.bestSellers = await this.productService.getBestSellers();
      if (!this.bestSellers || this.bestSellers.length === 0) {
        this.bestSellers = this.mockDataService.getMockBestSellers();
      }
    } catch (error) {
      // Fallback to mock data if API fails
      this.bestSellers = this.mockDataService.getMockBestSellers();
    }
  }
  goToProductDetail(productId: string): void {
    this.router.navigate(['/products/detail', productId]);
  }
}
