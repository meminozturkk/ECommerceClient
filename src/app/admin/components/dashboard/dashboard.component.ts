import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/contracts/hub-url';
import { ReceiveFunctions } from 'src/app/contracts/reveive-functions';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
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
    private signalRService: SignalRService
  ) {
    super(spinner);
    // signalRService.start(HubUrls.OrderHub);
    // signalRService.start(HubUrls.ProductHub);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);
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
  m() {
    this.alertify.message('merhaba', {
      messageType: MessageType.Success,
    });
  }
  d() {
    this.alertify.dismiss();
  }
}
