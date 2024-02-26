import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { CustomerModule } from './customers/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DeleteDirective } from '../../directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    MatSidenavModule,
    FileUploadModule,
  ],
})
export class ComponentsModule {}
