import { throwError } from 'rxjs';
import { Product } from '../../models/Product';
import { ILambdaFunction } from '../../models/lambda-function.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductSerivce {
  scrollId: string;
  lastEvaluatedKey: string;

  constructor(private http: HttpService) {
    this.scrollId = '';
    this.lastEvaluatedKey = '';
  }

  getProduct(payload: ILambdaFunction): Observable<Product[]> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        this.scrollId = res.body.scrollId;
        this.lastEvaluatedKey = res.body.productLastEvaluatedKey.upc;
        res.body.data.forEach((product) => (product['selectedQuantity'] = 1));
        return res.body.data;
      }),
      catchError((err) => throwError(err)),
    );
  }

  searchingItems(query: ILambdaFunction): Observable<Product[]> {
    return this.http.postHttpRequest(query).pipe(
      map((res) => {
        res.body.items.forEach((item) => (item['selectedQuantity'] = 1));
        return res.body.items;
      }),
      catchError((err) => throwError(err)),
    );
  }

  getFavouriteProducts(payload: ILambdaFunction): Observable<Product[]> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        return res.body.items;
      }),
      catchError((err) => throwError(err)),
    );
  }

  getAvailableQuantity(payload: ILambdaFunction): Promise<any> {
    const promise = this.http.postHttpRequest(payload).toPromise();
    return promise;
  }

  setFavouriteProducts(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => throwError(err)),
    );
  }

  deleteFavouriteProducts(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => throwError(err)),
    );
  }
}
