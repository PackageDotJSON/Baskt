import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class FavouritesStore implements OnDestroy {
  private favouriteItems$ = new BehaviorSubject<Product[]>(null);

  setFavourites(item: Product[]) {
    this.favouriteItems$.next(item);
  }

  setSingleItem(item: Product) {
    this.favouriteItems$.next(this.favouriteItems$.value.concat(item));
  }

  getFavourites(): Observable<Product[]> {
    return this.favouriteItems$.asObservable();
  }

  deleteFavourite(item: Product) {
    this.favouriteItems$.next(
      this.favouriteItems$.value.filter((res) => item.upc !== res.upc),
    );
  }

  unSubscribeFavourite() {
    this.favouriteItems$.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribeFavourite();
  }
}
