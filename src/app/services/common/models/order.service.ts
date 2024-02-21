import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/create_order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpCLientService: HttpClientService) {}

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post(
      {
        controller: 'orders',
      },
      order
    );

    await firstValueFrom(observable);
  }
}