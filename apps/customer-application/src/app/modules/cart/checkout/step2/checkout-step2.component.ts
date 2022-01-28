import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { CART_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from '@baskt-mono-repo/map';
import { CustomerLocationModel } from '../../../../models/customer-location.model';
import {
  DELIVERY_TYPE,
  MAP_BOX_STYLES,
  MAP_BOX_TOKEN,
  MAP_BOX_ZOOM,
  ORDER_DEFAULT_DISTANCE,
} from '../../../../settings/app.settings';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { MapModel } from '../../../../models/map.model';
import { BillingService } from '../../service/billing.service';
import { ORDER_PAYLOAD } from '../../settings/order-payload';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'baskt-shop-checkout-step-2',
  templateUrl: './checkout-step2.component.html',
  styleUrls: ['./checkout-step2.component.scss'],
})
export class CheckoutStep2Component implements OnInit, OnDestroy {
  //Variables for handling PrimeNg components
  inputSwitch = false;
  inputSlider: number;
  minTime: number;
  maxTime: number;
  displayMaximizable: boolean;
  displayMap = false;

  //variables for map
  readonly mapBoxToken = MAP_BOX_TOKEN;
  readonly mapBoxStyle = MAP_BOX_STYLES;
  readonly mapBoxZoom = MAP_BOX_ZOOM;

  //required variables
  deliveryTimeLimit = { minTime: '10', maxTime: '21' };
  deliveryFee: string;
  deliveryType = ['Standard', 'Express'];
  checkOutForm: FormGroup;
  customerLocations: CustomerLocationModel[];
  mapData: MapModel;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private mapService: MapService,
    private messageService: ToastMessageService,
    private billingService: BillingService,
  ) {
    this.deliveryFee = this.router.getCurrentNavigation().extras.state.data;

    this.checkOutForm = new FormGroup({
      locationName: new FormControl(null, Validators.required),
      userAddress: new FormControl(null, Validators.required),
      apartmentNo: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      userInstructions: new FormControl(null),
    });
    ORDER_PAYLOAD.deliveryType = DELIVERY_TYPE;
    ORDER_PAYLOAD.distance = ORDER_DEFAULT_DISTANCE;
  }

  ngOnInit() {
    this.getDeliveryTimeLimit();
    this.verifyLocalProducts();
    this.getCustomerLocation();
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  getDeliveryTimeLimit() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_GET_DELIVERY_TIME_LIMIT,
      {
        wherehouseLocationId: this.localStorageService.getData(
          LOCAL_STORAGE_KEY.LOCATION_ID,
        ),
      },
    );
    this.sub = this.cartService
      .getDeliveryTimeLimit(payload)
      .pipe(
        tap((res) => {
          this.deliveryTimeLimit.minTime = res.pickupMinTime;
          this.deliveryTimeLimit.maxTime = res.pickupMaxTime;
          this.minTime = Number(res.pickupMinTime.split(':')[0]);
          this.maxTime = Number(res.pickupMaxTime.split(':')[0]) + 12;
        }),
      )
      .subscribe();
  }

  verifyLocalProducts() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_VERIFY_LOCAL_PRODUCTS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        warehouseLocationId: this.localStorageService.getData(
          LOCAL_STORAGE_KEY.LOCATION_ID,
        ),
        zipCode: this.localStorageService.getData(LOCAL_STORAGE_KEY.ZIPCODE),
      },
    );
    this.cartService.verifyLocalProducts(payload);
  }

  getCustomerLocation() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_GET_CUSTOMER_LOCATIONS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.sub = this.cartService
      .getCustomerLocation(payload)
      .pipe(
        tap((data) => {
          if (data.items.length > 0) {
            this.customerLocations = data.items;
            ORDER_PAYLOAD.customerLocationId = data.items[0].locationId;
            this.checkOutForm.setValue({
              locationName: data.items[0].name,
              userAddress: data.items[0].address,
              apartmentNo: data.items[0].apartmentNumber,
              zipCode: data.items[0].zipCode,
              userInstructions: data.items[0].description,
            });
          }
        }),
      )
      .subscribe();
  }

  getMapLocation() {
    this.sub = this.mapService
      .getMapLocation()
      .pipe(
        tap((res) => {
          if (res !== '') {
            ORDER_PAYLOAD.distance = res.distanceFromStore;
            res.distanceFromStore = Number(res.distanceFromStore);
            this.mapData = res;
            if (this.mapData.locationName.includes('United States')) {
              this.checkOutForm.patchValue({
                userAddress: this.mapData.locationName,
                zipCode: this.mapData.zipCode,
              });
              this.displayMap = false;
            } else {
              this.messageService.displayMessage('error', 'Select Valid City');
            }
          }
        }),
      )
      .subscribe();
  }

  addCustomerLocation() {
    this.checkOutForm.patchValue({
      locationName: this.checkOutForm.value.locationName,
      apartmentNo: this.checkOutForm.value.apartmentNo,
      userInstructions: this.checkOutForm.value.userInstructions,
    });
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_ADD_CUSTOMER_LOCATION,
      {
        address: this.checkOutForm.value.userAddress,
        apartmentNumber: this.checkOutForm.value.apartmentNo,
        isDefault: false,
        latitude: this.mapData.latitude,
        longitude: this.mapData.longitude,
        name: this.checkOutForm.value.locationName,
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        zipCode: this.checkOutForm.value.zipCode,
      },
    );

    this.sub = this.cartService
      .addCustomerLocation(payload)
      .pipe(
        tap((res) => {
          if (res.message === 'Location added successfully') {
            this.messageService.displayMessage('success', res.message);
          }
        }),
      )
      .subscribe();
  }

  changeDeliveryType() {
    if (this.inputSwitch === true) {
      this.billingService.setDeliveryFee(this.deliveryFee['expressFee']);
      ORDER_PAYLOAD.deliveryType = 'express';
    } else {
      this.billingService.setDeliveryFee(this.deliveryFee['standardFee']);
      ORDER_PAYLOAD.deliveryType = 'standard';
    }
  }

  verifyTime() {
    if (this.inputSlider[0] > 12) {
      this.deliveryTimeLimit.minTime =
        (this.inputSlider[0] - 12).toString() + ':00 PM';
    } else {
      this.deliveryTimeLimit.minTime =
        this.inputSlider[0].toString() + ':00 AM';
    }
    if (this.inputSlider[1] > 12) {
      this.deliveryTimeLimit.maxTime =
        (this.inputSlider[1] - 12).toString() + ':00 PM';
    } else {
      this.deliveryTimeLimit.maxTime =
        this.inputSlider[1].toString() + ':00 AM';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.inputSwitch === true) {
      ORDER_PAYLOAD.deliveryTimeFrom = this.deliveryTimeLimit.minTime;
      ORDER_PAYLOAD.deliveryTimeTo = this.deliveryTimeLimit.maxTime;
    }
  }
}
