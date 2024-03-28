import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent, ListComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule.forChild([{ path: '', component: UserComponent }]),
  ],
})
export class UserModule {}
