import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterService } from '../../services/filter-service/filter.service';
import { ProductStore } from '../../state-management/store/product.store';
import { LambdaFunction } from '../../models/lambda-function.model';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../enums/lambda-functions-names.enum';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import {
  DEFAULT_FILTER_MIN_PRICE,
  DEFAULT_FILTER_MAX_PRICE,
  PRODUCT_LOAD_LIMIT,
} from '../../settings/app.settings';
import { ProductSerivce } from '../../services/product-service/product.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'baskt-shop-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  display = false;
  checked = false;
  categories$: Observable<Category[]>;
  filterProducts$: Observable<boolean>;
  selectedCategories: Category[] = [];
  brands$: Observable<any>;
  selectedBrands: any[] = [];
  filteredProducts: Product[];
  maxPrice = DEFAULT_FILTER_MAX_PRICE;
  minPrice = DEFAULT_FILTER_MIN_PRICE;
  subscriber: Subscription;

  private payLoadCategories = new LambdaFunction(
    PRODUCTS_FUNCTIONS_NAMES.APP_GET_PRODUCT_CATEGORY,
    {
      null: null,
    },
  );

  private payLoadBrands = new LambdaFunction(
    PRODUCTS_FUNCTIONS_NAMES.APP_GET_ALL_BRANDS,
    {
      null: null,
    },
  );

  constructor(
    private filterService: FilterService,
    private storeService: ProductStore,
    private productService: ProductSerivce,
  ) {}

  ngOnInit() {
    this.filterProducts$ = this.filterService.getFilteredProducts();
  }

  showDialog() {
    this.categories$ = this.filterService.getFilterCategories(
      this.payLoadCategories,
    );
    this.brands$ = this.filterService.getFilterBrands(this.payLoadBrands);
    this.display = true;
  }

  filterItems() {
    const categoryId = [];
    for (const i in this.selectedCategories) {
      categoryId[i] = this.selectedCategories[i].category_id;
    }
    const payLoadFilter = new LambdaFunction(
      PRODUCTS_FUNCTIONS_NAMES.APP_RAND_20,
      {
        brands: this.selectedBrands,
        categories: categoryId,
        condition: [],
        keyword: '',
        locationId: 'guest',
        maxPrice: this.maxPrice,
        minPrice: this.minPrice,
        phone: 'guest',
        scrollId: '',
        user: 'guest',
      },
    );
    this.subscriber = this.filterService
      .filterItems(payLoadFilter)
      .subscribe((res) => {
        this.filterService.setFilteredProducts(true);
        this.filteredProducts = res;
        this.storeService.setProducts(this.filteredProducts);
        this.display = false;
      });
  }

  clearFilter() {
    let loadedProducts = new Array<Product>();
    const payload = new LambdaFunction(PRODUCTS_FUNCTIONS_NAMES.APP_RAND_20, {
      limit: PRODUCT_LOAD_LIMIT,
      locationId: 'guest',
      maxPrice: DEFAULT_FILTER_MAX_PRICE,
      minPrice: DEFAULT_FILTER_MIN_PRICE,
      phone: 'guest',
      scrollId: '',
      productLastEvaluatedKey: '',
    });
    this.storeService
      .getProducts()
      .pipe(
        tap((product) => {
          loadedProducts = product;
        }),
      )
      .subscribe();
    this.productService
      .getProduct(payload)
      .pipe(
        tap((products) =>
          this.storeService.setProducts([...loadedProducts, ...products]),
        ),
      )
      .subscribe();
    this.filterService.setFilteredProducts(false);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
