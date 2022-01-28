import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProductsCardComponent } from './component/products-card/products-card.component';
import { LazyLoadDirective } from './directive/lazy-load.directive';

@NgModule({
  declarations: [ProductsCardComponent, LazyLoadDirective],
  imports: [CommonModule, RouterModule, CardModule, ToastModule, ButtonModule],
  exports: [ProductsCardComponent, LazyLoadDirective, CommonModule],
  providers: [MessageService],
})
export class SharedModule {}
