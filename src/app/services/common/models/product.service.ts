import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallback?: any,
    errorCallback?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({ controller: 'product' }, product).subscribe(
      (result) => {
        successCallback();
      },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallback(message);
      }
    );
  }

  async list(
    successCallback: () => void,
    errorCallback: (errorMessage: string) => void
  ): Promise<List_Product[]> {
    const promiseData: Promise<List_Product[]> = this.httpClientService
      .get<List_Product[]>({
        controller: 'product',
      })
      .toPromise();
    promiseData
      .then((d) => successCallback())
      .catch((err: HttpErrorResponse) => errorCallback(err.message));
    return await promiseData;
  }
}
