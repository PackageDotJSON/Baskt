import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { FavouritesStore } from '../../state-management/store/favourites.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'baskt-shop-favourite-product-details',
  templateUrl: './favourite-product-details.component.html',
  styleUrls: ['./favourite-product-details.component.scss'],
})
export class FavouriteProductDetailsComponent {
  favouriteProducts$: Observable<Product[]>;

  constructor(private favouriteStore: FavouritesStore) {
    this.favouriteProducts$ = this.favouriteStore.getFavourites();
  }
}
