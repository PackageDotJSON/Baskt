import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { LambdaFunction } from '../../models/lambda-function.model';
import { SEARCH_DEBOUNCE_TIME } from '../../settings/app.settings';
import { ProductStore } from '../../state-management/store/product.store';
import { ProductSerivce } from '../../services/product-service/product.service';
import { PRODUCTS_FUNCTIONS_NAMES } from '../../enums/lambda-functions-names.enum';
import { ROUTER_URLS } from '../../enums/router-urls.enum';
import { RouteDetectionStrategyService } from '../../services/route-detection-strategy.service';

@Component({
  selector: 'baskt-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') queryString: ElementRef;
  route$: Observable<string>;
  readonly homeUrl = ROUTER_URLS.HOME_URL;

  constructor(
    private searchService: ProductSerivce,
    private productStore: ProductStore,
    public routeDetectionService: RouteDetectionStrategyService,
  ) {
    this.route$ = this.routeDetectionService.currentRoute();
  }

  ngAfterViewInit() {
    fromEvent(this.queryString.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(SEARCH_DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((queryString: string) => {
        this.searchService
          .searchingItems(
            new LambdaFunction(PRODUCTS_FUNCTIONS_NAMES.APP_SEARCH_PRODUCT, {
              keyword: queryString,
              scrollId: '',
              phone: '',
              locationId: '',
              user: 'admin',
            }),
          )
          .pipe(tap((products) => this.productStore.setProducts(products)))
          .subscribe();
      });
  }

  ngOnDestroy() {
    this.productStore.unsubscribeProductStore();
  }
}
