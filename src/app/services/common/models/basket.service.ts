import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { List_Basket_Item } from 'src/app/contracts/List_Basket_Item';
import { Create_Basket_Item } from 'src/app/contracts/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/Update_Basket_Item';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private mockBasketItems: List_Basket_Item[] = [];
  
  constructor(
    private httpClientService: HttpClientService,
    private mockDataService: MockDataService
  ) {
    // Initialize mock basket items
    this.mockBasketItems = this.mockDataService.getMockBasketItems();
  }

  async get(): Promise<List_Basket_Item[]> {
    try {
      const observable: Observable<List_Basket_Item[]> =
        this.httpClientService.get({
          controller: 'baskets',
        });

      const result = await firstValueFrom(observable);
      return result && result.length > 0 ? result : this.mockBasketItems;
    } catch (error) {
      // Fallback to mock data if API fails
      return this.mockBasketItems;
    }
  }

  async add(basketItem: Create_Basket_Item): Promise<void> {
    try {
      const observable: Observable<any> = this.httpClientService.post(
        {
          controller: 'baskets',
        },
        basketItem
      );

      await firstValueFrom(observable);
      // Refresh mock data after successful add
      await this.refreshMockBasket();
    } catch (error) {
      // Add to mock basket if API fails
      await this.addToMockBasket(basketItem);
    }
  }

  private async addToMockBasket(basketItem: Create_Basket_Item): Promise<void> {
    const mockProducts = this.mockDataService.getMockProducts();
    const product = mockProducts.find((p) => p.id === basketItem.productId);
    
    if (product) {
      const existingItem = this.mockBasketItems.find(
        (item) => item.name === product.name
      );
      
      if (existingItem) {
        existingItem.quantity += basketItem.quantity;
      } else {
        const newItem: List_Basket_Item = {
          basketItemId: `basket-${Date.now()}`,
          name: product.name,
          price: product.price,
          quantity: basketItem.quantity,
        };
        this.mockBasketItems.push(newItem);
      }
    }
  }

  private async refreshMockBasket(): Promise<void> {
    try {
      const result = await this.get();
      if (result && result.length > 0) {
        this.mockBasketItems = result;
      }
    } catch (error) {
      // Keep existing mock data
    }
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    try {
      const observable: Observable<any> = this.httpClientService.put(
        {
          controller: 'baskets',
        },
        basketItem
      );

      await firstValueFrom(observable);
      // Update mock data after successful update
      await this.refreshMockBasket();
    } catch (error) {
      // Update mock basket if API fails
      const item = this.mockBasketItems.find(
        (i) => i.basketItemId === basketItem.basketItemId
      );
      if (item) {
        item.quantity = basketItem.quantity;
      }
    }
  }

  async remove(basketItemId: string) {
    try {
      const observable: Observable<any> = this.httpClientService.delete(
        {
          controller: 'baskets',
        },
        basketItemId
      );

      await firstValueFrom(observable);
      // Refresh mock data after successful remove
      await this.refreshMockBasket();
    } catch (error) {
      // Remove from mock basket if API fails
      this.mockBasketItems = this.mockBasketItems.filter(
        (item) => item.basketItemId !== basketItemId
      );
    }
  }
}
