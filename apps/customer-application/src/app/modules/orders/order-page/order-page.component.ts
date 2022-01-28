import { Component } from '@angular/core';
import { Order } from '../../../models/Order';
import { SKELETON_LOADER_LIMIT } from '../../../settings/app.settings';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { OrdersService } from '../service/orders.service';
import { ActivatedRoute } from '@angular/router';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { ORDERS_FUNCTION_NAMES } from '../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';

@Component({
  selector: 'baskt-shop-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent {
  customerOrders: Order[];
  ordersData: any;
  lastEvaluatedKey: string;
  showMoreButton = true;
  readonly skeletonList = new Array(SKELETON_LOADER_LIMIT);

  constructor(
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const ordersData = this.route.snapshot.data['orders'];
    this.lastEvaluatedKey = ordersData.lastEvaluatedKey;
    this.customerOrders = ordersData.data;
  }

  showMoreOrders() {
    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.APP_GET_CUSTOMER_ORDER,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        limit: 10,
        lastEvaluatedKey: this.lastEvaluatedKey,
      },
    );
    const subscriber = this.ordersService
      .getOrders(payload)
      .subscribe((res) => {
        if (res.success === true) {
          this.lastEvaluatedKey = res.lastEvaluatedKey;
          this.customerOrders = this.customerOrders.concat(res.data);
        } else {
          this.showMoreButton = false;
        }
        subscriber.unsubscribe();
      });
  }
}
