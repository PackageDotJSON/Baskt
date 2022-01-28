import { Component, Input, OnInit } from '@angular/core';
import { ORDERS_FUNCTION_NAMES } from 'apps/customer-application/src/app/enums/lambda-functions-names.enum';
import { LambdaFunction } from 'apps/customer-application/src/app/models/lambda-function.model';
import { OrdersService } from '../../service/orders.service';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';

@Component({
  selector: 'baskt-shop-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.scss'],
})
export class RatingCardComponent implements OnInit {
  @Input() orderId: string;
  @Input() ratingValue: number;
  @Input() feedBack: string;
  disableButton = false;

  constructor(
    private orderService: OrdersService,
    private messageService: ToastMessageService,
  ) {}

  ngOnInit() {
    this.verifyRating();
  }

  verifyRating() {
    if (this.ratingValue === 0) {
      this.disableButton = true;
    } else {
      this.disableButton = false;
    }
  }

  rateOrder() {
    const payload = new LambdaFunction(ORDERS_FUNCTION_NAMES.APP_RATE_ORDER, {
      feedback: this.feedBack,
      rating: this.ratingValue,
      orderId: this.orderId,
    });

    this.orderService.rateOrder(payload).subscribe((res) => {
      if (res.error === false) {
        this.messageService.displayMessage('success', res.message);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    });
  }
}
