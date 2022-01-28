import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ILambdaFunction } from '../../models/lambda-function.model';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredProducts$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) {}

  setFilteredProducts(value) {
    this.filteredProducts$.next(value);
  }

  getFilteredProducts(): Observable<boolean> {
    return this.filteredProducts$;
  }

  getFilterCategories(payLoad: ILambdaFunction): Observable<Category[]> {
    return this.http.postHttpRequest(payLoad).pipe(
      map((res) => {
        return res.body.data;
      }),
    );
  }

  getFilterBrands(payLoad: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payLoad).pipe(
      map((res) => {
        return res.brands;
      }),
    );
  }

  filterItems(payLoad: ILambdaFunction): Observable<Product[]> {
    return this.http.postHttpRequest(payLoad).pipe(
      map((res) => {
        return res.body.data;
      }),
    );
  }
}
