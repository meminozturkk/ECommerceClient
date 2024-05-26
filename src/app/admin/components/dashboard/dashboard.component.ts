import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/contracts/hub-url';
import { List_Product } from 'src/app/contracts/list_product';
import { ReceiveFunctions } from 'src/app/contracts/reveive-functions';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DashboradService } from 'src/app/services/admin/dashborad.service';
import { SignalRService } from 'src/app/services/common/signalr.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService,
    private dashboardService: DashboradService
  ) {
    super(spinner);
    // signalRService.start(HubUrls.OrderHub);
    // signalRService.start(HubUrls.ProductHub);
  }
  productCount: number = 0;
  totalOrderCount: number = 0;
  totalUserCount: number = 0;
  bestSellers: any;
  leastStock: number = 0;
  totalUnApprovedOrder: number = 0;
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);

    this.getProductCount();
    this.getOrderCount();
    this.getUserCount();
    this.getBestSellers();
    this.getUnApprovedOrder();
    this.signalRService.on(
      HubUrls.ProductHub,
      ReceiveFunctions.ProductAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          messageType: MessageType.Notify,
          position: Position.TopRight,
        });
      }
    );
    this.signalRService.on(
      HubUrls.OrderHub,
      ReceiveFunctions.OrderAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          messageType: MessageType.Notify,
          position: Position.TopCenter,
        });
      }
    );
  }

  async getProductCount() {
    // Ürün sayısını almak için servisi kullan
    this.productCount = await this.dashboardService.getProductCount();
  }
  async getBestSellers() {
    this.bestSellers = await this.dashboardService.getBestSellers();

    this.bestSellers.forEach((element) => {
      if (element.stock < 5) {
        this.leastStock++;
      }
    });
  }
  async getOrderCount() {
    // Toplam sipariş sayısını almak için servisi kullan
    this.totalOrderCount = await this.dashboardService.getOrderCount();
  }

  async getUserCount() {
    // Son hafta sipariş sayısını almak için servisi kullan
    this.totalUserCount = await this.dashboardService.getUserCount();
  }
  async getUnApprovedOrder() {
    this.totalUnApprovedOrder =
      await this.dashboardService.getUnApprovedOrderCount();
  }
}
