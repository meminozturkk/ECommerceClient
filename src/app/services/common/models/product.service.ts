import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { Observable, firstValueFrom } from 'rxjs';
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
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Product[];
    }> = this.httpClientService
      .get<{ totalCount: number; products: List_Product[] }>({
        controller: 'product',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();
    promiseData
      .then((d) => successCallback())
      .catch((err: HttpErrorResponse) => errorCallback(err.message));
    return await promiseData;
  }
  async delete(id: string) {
    const deleted: Observable<any> = this.httpClientService.delete<any>(
      { controller: 'product' },
      id
    );
    await firstValueFrom(deleted);
  }
}
