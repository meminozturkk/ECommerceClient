import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthorizeMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthorizeMenuComponent }]),
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AuthorizeMenuModule {}
