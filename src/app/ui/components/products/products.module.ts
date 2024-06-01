import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProductsComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent },
      { path: 'detail/:id', component: DetailComponent },
    ]),
    FormsModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
