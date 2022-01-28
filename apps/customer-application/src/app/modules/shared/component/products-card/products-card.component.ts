import { Product } from '../../../../models/Product';
import { Component, Input, OnInit } from '@angular/core';
import { UserState } from '../../../../state-management/state/user.state';
import { Observable, Subscription } from 'rxjs';
import { ProductSerivce } from '../../../../services/product-service/product.service';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { CartStore } from '../../../../state-management/store/cart.store';
import { FavouritesStore } from '../../../../state-management/store/favourites.store';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';
import { CartService } from '../../../../services/cart-service/cart.service';
import { RouteDetectionStrategyService } from '../../../../services/route-detection-strategy.service';

@Component({
  selector: 'baskt-shop-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent implements OnInit {
  @Input() product: Product;
  subscriber: Subscription;
  isLogin$: Observable<boolean>;
  detectedRoute$: Observable<string>;
  productQuantity = 1;
  readonly homeUrl = ROUTER_URLS.HOME_URL;
  readonly checkOutStep1 = ROUTER_URLS.CHECK_OUT_STEP1;
  readonly favouriteUrl = ROUTER_URLS.FAVOURITES_URL;

  constructor(
    private userState: UserState,
    private favouriteProductsService: ProductSerivce,
    private localStorageService: LocalStorageService,
    private messageService: ToastMessageService,
    private cartStore: CartStore,
    private favouriteStore: FavouritesStore,
    private cartService: CartService,
    private routeDetection: RouteDetectionStrategyService,
  ) {
    this.detectedRoute$ = this.routeDetection.currentRoute();
  }

  ngOnInit() {
    this.isLogin$ = this.userState.userStatus();
  }

  quantityOperations(event?: string): void {
    const payload = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_GET_AVAILABLE_QUANTITY,
      {
        cartItems: [
          {
            upc: this.product.upc,
            condition: this.product.condition,
          },
        ],
      },
    );

    this.favouriteProductsService.getAvailableQuantity(payload).then((res) => {
      if (res.resultCode == 'Ok') {
        if (event === 'add') {
          console.log(
            this.productQuantity < res.items[0].quantity &&
              this.productQuantity !== res.items[0].quantity,
          );
          {
            this.productQuantity++;
            this.messageService.displayMessage(
              'success',
              'Product quantity increased',
            );
          }
        }
        if (event === 'minus' && this.productQuantity > 1) {
          this.productQuantity--;
          this.messageService.displayMessage(
            'success',
            'Product quantity decreased',
          );
        }
      }
    });
  }

  addToFavourites() {
    const payload = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_ADD_TO_FAVOURITE,
      {
        upc: this.product.upc,
        condition: this.product.condition,
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );

    this.subscriber = this.favouriteProductsService
      .setFavouriteProducts(payload)
      .subscribe((res) => {
        if (res.message == 'Product added to your favourites') {
          this.messageService.displayMessage('success', res.message);
          this.favouriteStore.setSingleItem(this.product);
        } else if (res.message == 'Already in favorite list.') {
          this.removeFromFavourites();
        } else {
          this.messageService.displayMessage('error', res.message);
        }
        this.subscriber.unsubscribe();
      });
  }

  removeFromFavourites() {
    const payload = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_REMOVE_FROM_FAVOURITE,
      {
        upc: this.product.upc,
        condition: this.product.condition,
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );

    this.subscriber = this.favouriteProductsService
      .deleteFavouriteProducts(payload)
      .subscribe((res) => {
        if (res.error == false) {
          this.messageService.displayMessage('success', res.message);
          this.favouriteStore.deleteFavourite(this.product);
        } else {
          this.messageService.displayMessage('error', res.message);
        }
        this.subscriber.unsubscribe();
      });
  }

  addToCart(item: Product) {
    const payload = {
      item: item,
      phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
    };

    this.cartService.addToCart(payload).then((res) => {
      if (res.status == 1) {
        this.messageService.displayMessage('success', res.message);
        this.cartStore.setSingleItem(item);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    });
  }

  removeFromCart(item: Product) {
    const payload = {
      item: item,
      phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
    };
    this.cartService.removeFromCart(payload);
  }

  notifyMe(item: Product) {
    const payload = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_OUT_OF_STOCK_NOTIFY_ME,
      {
        condition: item.condition,
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        upc: item.upc,
      },
    );

    const subscriber = this.cartService.notifyMe(payload).subscribe((res) => {
      if (res.body.status === 1) {
        this.messageService.displayMessage('success', res.body.msg);
      } else {
        this.messageService.displayMessage('error', res.body.msg);
      }
    });
    subscriber.unsubscribe();
  }
}
