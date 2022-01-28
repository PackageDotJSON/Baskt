import { ProductSerivce } from '../product.service';
import { Product } from '../../../models/Product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../../enums/lambda-functions-names.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product[]> {
  private query: LambdaFunction;

  constructor(private productService: ProductSerivce) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    this.query = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_SEARCH_PRODUCT,
      {
        keyword: route.queryParams['name'],
        user: 'admin',
        upc: route.params['upc'],
        selectedCondition: route.queryParams['condition'],
      },
    );
    return this.productService.searchingItems(this.query);
  }
}
