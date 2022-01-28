import { Component, OnInit } from '@angular/core';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { Product } from '../../../models/Product';
import { ProductSerivce } from '../../../services/product-service/product.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { PRODUCT_LOAD_LIMIT } from '../../../settings/app.settings';
import { CartService } from '../../../services/cart-service/cart.service';
import { ToastMessageService } from '../../../services/toast-message-service/toast-message.service';
import { CartStore } from '../../../state-management/store/cart.store';
import { FavouritesStore } from '../../../state-management/store/favourites.store';
import { ROUTER_URLS } from '../../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-favourite-products-card',
  templateUrl: './favourite-products-card.component.html',
  styleUrls: ['./favourite-products-card.component.scss'],
})
export class FavouriteProductsCardComponent implements OnInit {
  favouriteProducts$: Observable<Product[]>;
  readonly favouritesUrl = ROUTER_URLS.FAVOURITES_URL;

  constructor(
    private favouriteProductsService: ProductSerivce,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private messageService: ToastMessageService,
    private cartStore: CartStore,
    private favouriteStore: FavouritesStore,
  ) {}

  ngOnInit() {
    this.getFavourites();
  }

  getFavourites() {
    const payload = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_GET_CUSTOMER_FAVOURITE_PRODUCTS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        locationId: this.localStorageService.getData(
          LOCAL_STORAGE_KEY.LOCATION_ID,
        ),
        limit: PRODUCT_LOAD_LIMIT,
        lastEvaluatedKey: '',
      },
    );
    this.favouriteProductsService
      .getFavouriteProducts(payload)
      .subscribe((res) => {
        this.favouriteStore.setFavourites(res);
      });
      this.favouriteProducts$ = this.favouriteStore.getFavourites();
  }

  addToCart(favouriteProduct: Product) {
    this.cartService.addToCart(favouriteProduct).then((res) => {
      if (res.status === 1) {
        this.messageService.displayMessage('success', res.message);
        this.cartStore.setSingleItem(favouriteProduct);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    });
  }
}
