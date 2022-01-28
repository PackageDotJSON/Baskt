import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../service/orders.service';
import { ActivatedRoute } from '@angular/router';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { ORDERS_FUNCTION_NAMES } from '../../../enums/lambda-functions-names.enum';
import { Product } from '../../../models/Product';
import { OrderDetailsModel } from '../../../models/order-details.model';
import { ToastMessageService } from '../../../services/toast-message-service/toast-message.service';
import { REFUND_TYPE } from '../../../settings/app.settings';

@Component({
  selector: 'baskt-shop-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderId: string;
  orderDetails: Product[];
  subTotal = 0;
  orderBilling: OrderDetailsModel;
  subscriber = [];

  constructor(
    private ordersService: OrdersService,
    private messageService: ToastMessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscriber.push(
      this.route.queryParamMap.subscribe((params) => {
        this.orderId = params.get('order_id');
      }),
    );

    this.getOrderDetailsById();
  }

  getOrderDetailsById() {
    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.APP_GET_ITEMS_BY_ORDER_ID,
      {
        orderId: this.orderId,
      },
    );

    this.subscriber.push(
      this.ordersService.getOrderDetailsById(payload).subscribe((res) => {
        this.orderBilling = res;
        this.orderDetails = res.items;
        this.calculateBill();
      }),
    );
  }

  calculateBill() {
    this.orderDetails.forEach((element) => {
      this.subTotal += element.price;
    });
  }

  refundItem(upc: string) {
    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.STOCKING_REFUND_ITEM,
      {
        condition: 0,
        orderId: this.orderId,
        quantity: 1,
        type: REFUND_TYPE.itemRefund,
        upc: upc,
      },
    );

    this.subscriber.push(
      this.ordersService.refundItem(payload).subscribe((res) => {
        if (res.error === true) {
          this.messageService.displayMessage('error', res.message);
        } else {
          this.messageService.displayMessage('success', res.message);
        }
      }),
    );
  }

  refundAllItems() {
    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.STOCKING_REFUND_ITEM,
      {
        condition: '-',
        orderId: this.orderId,
        quantity: '-',
        type: REFUND_TYPE.orderRefund,
        upc: '-',
      },
    );

    this.subscriber.push(
      this.ordersService.refundItem(payload).subscribe((res) => {
        if (res.error === true) {
          this.messageService.displayMessage('error', res.message);
        } else {
          this.messageService.displayMessage('success', res.message);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriber.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
