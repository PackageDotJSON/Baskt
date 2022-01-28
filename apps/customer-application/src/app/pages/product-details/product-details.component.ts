import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { ToastMessageService } from '../../services/toast-message-service/toast-message.service';
import { UserState } from '../../state-management/state/user.state';
import { Observable } from 'rxjs';
import { CartStore } from '../../state-management/store/cart.store';

@Component({
  selector: 'baskt-shop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  relatedProducts: Product[];
  isLogin$: Observable<boolean>;
  buttonDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private messageService: ToastMessageService,
    private userState: UserState,
    private cartStore: CartStore,
  ) {
    this.isLogin$ = this.userState.userStatus();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const products = <Product[]>this.activatedRoute.snapshot.data['products'];
    console.log('products======>', products);
    this.product = products[0];
    this.relatedProducts = products.splice(1);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).then((res) => {
      if (res.status == 1) {
        this.buttonDisabled = true;
        this.messageService.displayMessage('success', res.message);
        this.cartStore.setSingleItem(product);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    });
  }
}
