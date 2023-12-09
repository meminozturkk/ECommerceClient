import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.SuareJellyBox);
    this.httpClientService
      .get<Create_Product[]>({
        controller: 'Product',
      })
      .subscribe((data) => console.log(data));
    this.httpClientService
      .post(
        { controller: 'product' },
        {
          name: 'merhaba',
          stock: 20,
          price: 30,
        }
      )
      .subscribe();
  }
}
