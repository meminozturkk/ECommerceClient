import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  /**
   *
   */
  constructor(private spinner: NgxSpinnerService) {}
  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);
    setTimeout(() => this.hideSpinner(spinnerNameType), 200);
  }
  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}
export enum SpinnerType {
  SuareJellyBox = 's1',
  BallScaleMultiple = 's2',
  BallBeat = 's3',
}
