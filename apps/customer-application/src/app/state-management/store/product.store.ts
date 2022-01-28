import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/Product';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductStore implements OnDestroy {
  private product$ = new BehaviorSubject<Product[]>([]);

  setProducts(searchedProducts: Product[]) {
    this.product$.next(searchedProducts);
  }

  getProducts(): Observable<Product[]> {
    return this.product$.asObservable();
  }

  unsubscribeProductStore() {
    this.product$.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribeProductStore();
  }
}
