import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartStore } from '../../../../state-management/store/cart.store';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { CartService } from '../../service/cart.service';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { LambdaFunction } from 'apps/customer-application/src/app/models/lambda-function.model';
import {
  CART_FUNCTION_NAMES,
  COUPON_FUNCTION_NAMES,
  ORDERS_FUNCTION_NAMES,
} from 'apps/customer-application/src/app/enums/lambda-functions-names.enum';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';
import { BillingService } from '../../service/billing.service';
import { COUPON_PAYLOAD } from '../../settings/card-settings.constant';
import { ORDER_PAYLOAD } from '../../settings/order-payload';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { DELIVERY_TYPE } from '../../../../settings/app.settings';
import { RouteDetectionStrategyService } from '../../../../services/route-detection-strategy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'baskt-shop-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  subTotalPrice = 0;
  deliveryFee = 0;
  totalPrice: number;
  totalTax: number;
  expressDeliveryFee = 0;
  basktBucks = 0;
  userBasktBucks = 0;
  couponCode = null;
  couponPrice = 0;
  subscriptions: Subscription[] = [];
  readonly checkOutStep1Url = ROUTER_URLS.CHECK_OUT_STEP1;
  readonly checkOutStep2Url = ROUTER_URLS.CHECK_OUT_STEP2;
  readonly checkOutStep3Url = ROUTER_URLS.CHECK_OUT_STEP3;

  constructor(
    public activeRoute: RouteDetectionStrategyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartStore: CartStore,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private messageService: ToastMessageService,
    private billingService: BillingService,
  ) {}

  ngOnInit() {
    this.calculateSubTotalPrice();
    this.getDeliveryAmount();
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  calculateSubTotalPrice() {
    this.sub = this.cartStore
      .getCart()
      .pipe(
        tap((products) => {
          ORDER_PAYLOAD.cartItems = products;
          this.subTotalPrice =
            products && products.length
              ? _.reduce(products, (acc, product) => acc + product.price, 0.0)
              : 0.0;
        }),
      )
      .subscribe();
  }

  getDeliveryAmount() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_CHECK_DELIVERY_AMOUNT,
      {
        amount: this.subTotalPrice,
        customerLocationId: null,
        deliveryType: DELIVERY_TYPE,
        locationId: this.localStorageService.getData(
          LOCAL_STORAGE_KEY.LOCATION_ID,
        ),
        zipCode: this.localStorageService.getData(LOCAL_STORAGE_KEY.ZIPCODE),
      },
    );

    this.sub = this.cartService
      .getDeliveryAmount(payload)
      .pipe(
        tap((data) => {
          if (data.statusCode === 200) {
            this.deliveryFee = data.body.standardDeliveryCharges;
            this.expressDeliveryFee = data.body.expressDeliveryCharges;
            this.totalTax =
              (this.subTotalPrice / 100) * data.body.totalTaxPercentage * 100;
            this.totalPrice = this.subTotalPrice + this.totalTax;
          } else {
            this.messageService.displayMessage('error', data.message);
          }
        }),
      )
      .subscribe();
  }

  getBasktBucks() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_GET_CUSTOMER_BASKT_BUCKS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.sub = this.cartService
      .getBasktBucks(payload)
      .pipe(
        tap((data) => {
          if (data.found === true) {
            this.basktBucks = data.basktBucks;
          } else {
            this.messageService.displayMessage('error', data.message);
          }
        }),
      )
      .subscribe();
  }

  validateCoupon() {
    COUPON_PAYLOAD.couponCode = this.couponCode;
    const payload = new LambdaFunction(
      COUPON_FUNCTION_NAMES.APP_VALIDATE_COUPON,
      {
        cartItems: ORDER_PAYLOAD.cartItems,
        couponCode: COUPON_PAYLOAD.couponCode,
        deviceType: COUPON_PAYLOAD.deviceType,
      },
    );

    this.sub = this.cartService
      .validateCouponCode(payload)
      .pipe(
        tap((res) => {
          if (res.body.status === 0) {
            this.messageService.displayMessage('error', res.body.msg);
          } else {
            this.messageService.displayMessage('success', res.body.msg);
            this.totalPrice =
              this.subTotalPrice +
              this.totalTax +
              this.deliveryFee -
              res.body.couponDiscount;
            this.couponPrice = res.body.couponDiscount;
          }
        }),
      )
      .subscribe();
  }

  useAllBucks() {
    if (this.basktBucks > this.subTotalPrice) {
      this.userBasktBucks = this.subTotalPrice;
      this.totalPrice =
        this.subTotalPrice +
        this.totalTax +
        this.deliveryFee -
        this.userBasktBucks;
    }
  }

  useCalculatedBucks() {
    if (this.userBasktBucks > this.subTotalPrice) {
      this.userBasktBucks = this.subTotalPrice;
    }
    this.totalPrice =
      this.subTotalPrice +
      this.totalTax +
      this.deliveryFee -
      this.userBasktBucks;
  }

  updateDeliveryFee() {
    this.sub = this.billingService
      .getDeliveryFee()
      .pipe(
        tap((res) => {
          this.deliveryFee = res;
          this.totalPrice = this.subTotalPrice + this.totalTax;
          this.totalPrice = this.totalPrice + this.deliveryFee;
        }),
      )
      .subscribe();
  }

  placeOrder() {
    ORDER_PAYLOAD.basktBucks = this.userBasktBucks;
    ORDER_PAYLOAD.cuponCode = this.couponCode;

    const payload = new LambdaFunction(
      ORDERS_FUNCTION_NAMES.APP_PLACE_ORDER,
      ORDER_PAYLOAD,
    );
    this.sub = this.cartService
      .placeOrder(payload)
      .pipe(
        tap((res) => {
          if (res.body.status !== 0) {
            this.messageService.displayMessage('success', res.body.msg);
            this.router.navigateByUrl(ROUTER_URLS.HOME_URL);
          } else {
            this.messageService.displayMessage('error', res.msg);
          }
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
