import { ActivatedRoute } from '@angular/router';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import {
  PRODUCT_LOAD_LIMIT,
  SKELETON_LOADER_LIMIT,
} from '../../settings/app.settings';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../enums/lambda-functions-names.enum';
import { LambdaFunction } from '../../models/lambda-function.model';
import { Observable } from 'rxjs';
import { ProductStore } from '../../state-management/store/product.store';
import { tap } from 'rxjs/operators';
import { ProductSerivce } from '../../services/product-service/product.service';
import { UserState } from '../../state-management/state/user.state';

@Component({
  selector: 'baskt-shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  scrollId!: string;
  private payload: LambdaFunction;
  productsData$: Observable<Product[]>;
  isLogin$: Observable<boolean>;
  readonly skeletonList = new Array(SKELETON_LOADER_LIMIT);

  constructor(
    private productService: ProductSerivce,
    private productStore: ProductStore,
    private activatedRoute: ActivatedRoute,
    private userState: UserState,
  ) {}

  ngOnInit() {
    this.productStore.setProducts(
      this.activatedRoute.snapshot.data['products'],
    );
    this.productsData$ = this.productStore.getProducts();
    this.isLogin$ = this.userState.userStatus();
  }

  loadMore() {
    let loadedProducts = new Array<Product>();
    this.payload = new LambdaFunction(PRODUCTS_FUNCTIONS_NAMES.APP_RAND_20, {
      limit: PRODUCT_LOAD_LIMIT,
      locationId: 'guest',
      maxPrice: '500',
      minPrice: '0',
      phone: 'guest',
      scrollId: this.productService.scrollId,
      productLastEvaluatedKey: this.productService.lastEvaluatedKey,
    });
    this.productStore
      .getProducts()
      .pipe(
        tap((product) => {
          loadedProducts = product;
        }),
      )
      .subscribe();
    this.productService
      .getProduct(this.payload)
      .pipe(
        tap((products) =>
          this.productStore.setProducts([...loadedProducts, ...products]),
        ),
      )
      .subscribe();
  }
}
