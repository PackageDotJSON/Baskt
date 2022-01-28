import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { ORDERS_FUNCTION_NAMES } from '../../../enums/lambda-functions-names.enum';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { TrackingModel } from '../../../models/tracking.model';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'baskt-shop-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  orderId: string;
  items: MenuItem[];
  trackingData$: Observable<TrackingModel[]>;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const subscriber = this.route.queryParamMap.subscribe((params) => {
      this.orderId = params.get('order_id');
    });
    subscriber.unsubscribe();
    this.items = [
      { label: 'Ready' },
      { label: 'In Transit' },
      { label: 'Delivered' },
    ];
    this.trackOrder();
  }

  trackOrder() {
    const payload = new LambdaFunction(ORDERS_FUNCTION_NAMES.APP_TRACK_ORDER, {
      orderId: this.orderId,
    });

    this.trackingData$ = this.ordersService.trackOrder(payload);
  }
}
