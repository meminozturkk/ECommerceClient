import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

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
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalProductCount: number;
      products: List_Product[];
    }> = this.httpClientService
      .get<{ totalProductCount: number; products: List_Product[] }>({
        controller: 'product',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();
    promiseData
      .then((d) => successCallback())
      .catch((err: HttpErrorResponse) => errorCallback(err.message));
    return await promiseData;
  }

  async getBestSellers(): Promise<
    { name: string; stock: number; sales: number; path: string }[]
  > {
    // Ürün satış bilgilerini al
    const salesCount = await this.httpClientService
      .get<{ [id: string]: number }>({
        controller: 'product',
        action: 'GetProductSales',
      })
      .toPromise();
    debugger;
    // Ürün bilgilerini al
    const products = await this.httpClientService
      .get<{ totalProductCount: number; products: List_Product[] }>({
        controller: 'product',
        queryString: `page=0&size=10`, // Daha büyük bir liste alıyoruz ki tüm ürün bilgilerini alabilelim
      })
      .toPromise();

    // En çok satan ürünleri oluştur
    return products.products
      .map((product) => {
        const sales = salesCount.productSales[product.name] || 0;
        return {
          id: product.id,
          name: product.name,
          stock: product.stock,
          sales: sales,
          path:
            product.productImageFile.length > 0
              ? product.productImageFile[0].path
              : '',
        };
      })
      .sort((a, b) => b.sales - a.sales); // Satış sayılarına göre sırala
  }
  async delete(id: string) {
    const deleted: Observable<any> = this.httpClientService.delete<any>(
      { controller: 'product' },
      id
    );
    await firstValueFrom(deleted);
  }
  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getproductimages',
          controller: 'product',
        },
        id
      );

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }
  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteproductimage',
        controller: 'product',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
  async changeShowcaseImage(
    imageId: string,
    productId: string,
    successCallBack?: () => void
  ): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: 'product',
      action: 'ChangeShowcaseImage',
      queryString: `imageId=${imageId}&productId=${productId}`,
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
  async updateStockQrCodeToProduct(
    ProductId: string,
    Stock: number,
    Name: string,
    Price: any,

    successCallBack?: () => void
  ) {
    const observable = this.httpClientService.put(
      {
        action: 'qrcode',
        controller: 'product',
      },
      {
        ProductId,
        Stock,
        Name,
        Price,
      }
    );

    await firstValueFrom(observable);
    successCallBack();
  }
  async getById(id: string): Promise<{
    product: List_Product;
  }> {
    const product = await this.httpClientService
      .get<{ product: List_Product }>(
        {
          controller: 'product',
        },
        id
      )
      .toPromise();
    console.log(product);
    return product;
  }
}
