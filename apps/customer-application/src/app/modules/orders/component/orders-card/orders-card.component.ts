import { Component, Input } from '@angular/core';
import { Order } from '../../../../models/Order';
import { Router } from '@angular/router';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';
import { ORDER_STATUS_ID } from './orders-card.enum';

@Component({
  selector: 'baskt-shop-orders-card',
  templateUrl: './orders-card.component.html',
  styleUrls: ['./orders-card.component.scss'],
})
export class OrdersCardComponent {
  @Input() customerOrder: Order;
  showOrderDetails = false;
  display = false;
  displayContact = false;

  readonly orderDetailsUrl = ROUTER_URLS.ORDER_DETAILS_URL;
  readonly trackOrderUrl = ROUTER_URLS.TRACK_ORDER_URL;
  readonly orderInDelivery = ORDER_STATUS_ID.ORDER_IN_DELIVERY;
  readonly orderCompleted = ORDER_STATUS_ID.ORDER_COMPLETED;
  readonly orderReturned = ORDER_STATUS_ID.ORDER_RETURNED;
  readonly driverPhone = ORDER_STATUS_ID.DRIVER_PHONE;

  showDialog() {
    this.display = true;
  }

  showContactDialog() {
    this.displayContact = true;
  }
}
