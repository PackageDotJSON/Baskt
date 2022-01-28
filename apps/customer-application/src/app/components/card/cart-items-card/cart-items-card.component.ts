import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { CartStore } from '../../../state-management/store/cart.store';
import { Observable } from 'rxjs';
import { ROUTER_URLS } from '../../../enums/router-urls.enum';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'baskt-shop-cart-items-card',
  templateUrl: './cart-items-card.component.html',
  styleUrls: ['./cart-items-card.component.scss'],
})
export class CartItemsCardComponent implements OnInit {
  totalPrice = 0.0;
  cartItems$: Observable<Product[]>;
  readonly checkOutUrl = ROUTER_URLS.CHECK_OUT_STEP1;

  constructor(private cartStore: CartStore) {}

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartStore.setCart();
    this.cartItems$ = this.cartStore.getCart().pipe(
      tap((products) => {
        this.totalPrice =
          products && products.length
            ? _.reduce(products, (acc, product) => acc + product.price, 0.0)
            : 0.0;
      }),
    );
  }
}
