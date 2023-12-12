import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';
  /**
   *
   */
  constructor(
    private toastr: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {
    // this.toastr.message('merhaba', 'kullanici', {
    //   messageType: ToastrMessageType.Error,
    //   position: ToastrPosition.BottomCenter,
    // });
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);
  }
}
// $(document).ready(()=> {
//   alert("asd")
// })

// $.get('https://localhost:7076/api/Product', (data) => {
//   console.log(data);
// });
