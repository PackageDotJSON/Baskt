import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Order } from '../../../../models/Order';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { Observable } from 'rxjs';
import { OrdersService } from '../orders.service';
import { ORDERS_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';

@Injectable()
export class OrderResolver implements Resolve<Order[]> {
  constructor(
    private ordersService: OrdersService,
    private localStorageService: LocalStorageService,
  ) {
  }

  resolve(): Observable<Order[]> {
    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.APP_GET_CUSTOMER_ORDER,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        limit: 10,
        lastEvaluatedKey: ""
      },
    );
    return this.ordersService.getOrders(payload);
  }
}
