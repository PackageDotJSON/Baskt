import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/Product';
import * as _ from 'lodash';
import { CartService } from '../../services/cart-service/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartStore implements OnDestroy {
  private cartItems$ = new BehaviorSubject<Product[]>([]);
  private cartLength$ = new BehaviorSubject<number>(0);

  constructor(
    private cartService: CartService
  ) {}

  setCart() {
    this.cartService
      .getCartDetails()
      .then((cartItems) => {
        this.cartItems$.next(cartItems);
        this.cartLength$.next(cartItems.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setSingleItem(item: Product) {
    const cartData = this.cartItems$.value;
    cartData.push(item);
    this.cartItems$.next(cartData);
    this.cartLength$.next(cartData.length);
  }

  getCart(): Observable<Product[]> {
    return this.cartItems$.asObservable();
  }

  getCartLength(): Observable<number> {
    return this.cartLength$.asObservable();
  }

  deleteCart(item: Product) {
    const cartData = this.cartItems$.value;
    const index = _.indexOf(cartData, item);
    cartData.splice(index, 1);
    this.cartItems$.next(cartData);
    this.cartLength$.next(cartData.length);
  }

  emptyCart() {
    this.cartItems$.next([]);
    this.cartLength$.next(0);
  }

  unsubscribeCart() {
    this.cartItems$.unsubscribe();
    this.cartLength$.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribeCart();
  }
}
