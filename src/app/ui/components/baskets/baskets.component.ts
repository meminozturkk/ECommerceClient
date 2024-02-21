import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/List_Basket_Item';
import { Update_Basket_Item } from 'src/app/contracts/Update_Basket_Item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { Router } from '@angular/router';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { Create_Order } from 'src/app/contracts/create_order';
import { OrderService } from 'src/app/services/common/models/order.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {
    super(spinner);
  }
  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallBeat);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallBeat);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallBeat);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallBeat);
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallBeat);
    await this.basketService.remove(basketItemId);

    var a = $('.' + basketItemId);
    $('.' + basketItemId).fadeOut(500, () =>
      this.hideSpinner(SpinnerType.BallBeat)
    );
  }
  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallBeat);
    const order: Create_Order = new Create_Order();
    order.address = 'Yenimahalle';
    order.description = 'Falanca filanca...';
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallBeat);
    this.toastrService.message('Sipariş alınmıştır!', 'Sipariş Oluşturuldu!', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
    this.router.navigate(['/']);
  }
}
