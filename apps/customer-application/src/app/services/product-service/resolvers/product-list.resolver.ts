import { ProductSerivce } from './../product.service';
import { PRODUCT_LOAD_LIMIT } from '../../../settings/app.settings';
import { Product } from '../../../models/Product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../../enums/lambda-functions-names.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductSerivce) {}

  resolve(): Observable<Product[]> {
    const payload = new LambdaFunction(PRODUCTS_FUNCTIONS_NAMES.APP_RAND_20, {
      limit: PRODUCT_LOAD_LIMIT,
      locationId: 'guest',
      maxPrice: '500',
      minPrice: '0',
      phone: 'guest',
      scrollId: '',
    });
    return this.productService.getProduct(payload);
  }
}
