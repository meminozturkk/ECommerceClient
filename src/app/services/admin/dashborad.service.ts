import { Injectable } from '@angular/core';
import { OrderService } from '../common/models/order.service';
import { ProductService } from '../common/models/product.service';
import { UserService } from '../common/models/user.service';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class DashboradService {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
  ) {}
  async getOrderCount() {
    const orders = await this.orderService.getAllOrders();
    return orders.totalOrderCount;
  }
  async getProductCount() {
    const products = await this.productService.list();

    return products.totalProductCount;
  }
  async getUserCount() {
    const users = await this.userService.getAllUsers();
    return users.totalUsersCount;
  }
  async getBestSellers() {
    const bestSellers = await this.productService.getBestSellers();
    return bestSellers;
  }
  async getUnApprovedOrderCount() {
    let unApprovedOrderCount: number = 0;
    const bestSellers = await this.orderService.getAllOrders(0, 1000);
    bestSellers.orders.forEach((element) => {
      if (!element.completed) {
        unApprovedOrderCount++;
      }
    });
    return unApprovedOrderCount;
  }
}
