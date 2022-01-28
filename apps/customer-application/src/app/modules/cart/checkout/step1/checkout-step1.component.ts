import { Component, OnInit } from '@angular/core';
import { Product } from 'apps/customer-application/src/app/models/Product';
import { Observable } from 'rxjs';
import { CartStore } from '../../../../state-management/store/cart.store';
import { CheckoutStep1Service } from './checkout-step1.service';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { Router } from '@angular/router';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'baskt-shop-checkout-step-1',
  templateUrl: './checkout-step1.component.html',
  styleUrls: ['./checkout-step1.component.scss'],
})
export class CheckoutStep1Component implements OnInit {
  cartItems$: Observable<Product[]>;

  constructor(
    private cartStore: CartStore,
    private checkoutStep1Service: CheckoutStep1Service,
    private messageService: ToastMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartItemsCheckOut();
  }

  cartItemsCheckOut() {
    this.cartItems$ = this.cartStore.getCart();
  }

  clearCart() {
    this.checkoutStep1Service.clearCart().pipe(tap((res) => {
      if (res.error === false) {
        this.cartStore.emptyCart();
        this.messageService.displayMessage('success', res.message);
        this.router.navigateByUrl(ROUTER_URLS.HOME_URL);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    })).subscribe();
  }
}
