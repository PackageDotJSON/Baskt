import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { UserState } from '../../state-management/state/user.state';
import { CartStore } from '../../state-management/store/cart.store';

@Injectable({
  providedIn: 'root',
})
export class CartGuard implements CanLoad, CanActivate {
  constructor(private userState: UserState, private cartStore: CartStore) {}

  canLoad(): boolean {
    return this.activationRules();
  }

  canActivate(): boolean {
    return this.activationRules();
  }

  activationRules(): boolean {
    let numberOfCartItems = 0;
    this.cartStore.setCart();
    this.cartStore.getCartLength().subscribe((numberOfCartItemsInCart) => {
      numberOfCartItems = numberOfCartItemsInCart;
    });
    return numberOfCartItems > 0;
  }
}
