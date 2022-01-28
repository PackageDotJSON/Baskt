import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AMERICAN_EXPRESS_CARD,
  CARD_MONTHS,
  DEFAULT_GIFT_CODE,
  DEFAULT_TYPE, DISCOVER_CARD, JCB_CARD,
  MASTER_CARD,
  VISA_CARD,
} from '../../settings/card-settings.constant';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { ORDER_PAYLOAD } from '../../settings/order-payload';
import { Encrypt } from '@baskt-mono-repo/encryption';
import { Subscription } from 'rxjs';

@Component({
  selector: 'baskt-shop-checkout-step-3',
  templateUrl: './checkout-step3.component.html',
  styleUrls: ['./checkout-step3.component.scss'],
})
export class CheckoutStep3Component implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  months = CARD_MONTHS;
  years = [];
  cardType: string;
  displayConditions: boolean;
  subscription: Subscription[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl(null, Validators.required),
      expiryMonth: new FormControl(null, Validators.required),
      expiryYear: new FormControl(null, Validators.required),
      cardNumber: new FormControl(null, Validators.required),
      cvvNumber: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.generateCalenderYears();
    this.placeOrder();
  }

  private set sub(sub: Subscription) {
    this.subscription.push(sub);
  }

  generateCalenderYears() {
    for (let i = 2021; i <= 2050; i++) {
      this.years.push({ name: i, value: JSON.stringify(i) });
    }
  }

  checkCardType() {
    const cardNumber = this.paymentForm.get('cardNumber').value;
    if (Number(cardNumber[0]) === 4) {
      this.cardType = VISA_CARD;
    } else if (Number(cardNumber[0]) === 2 || Number(cardNumber[0]) === 5) {
      this.cardType = MASTER_CARD;
    } else if (Number(cardNumber[0]) === 3) {
      if (Number(cardNumber[1]) === 7) {
        this.cardType = AMERICAN_EXPRESS_CARD;
      } else {
        this.cardType = JCB_CARD;
      }
    } else if (Number(cardNumber[0]) === 6) {
      if (Number(cardNumber[1]) !== 2 && Number(cardNumber[2]) !== 0) {
        this.cardType = DISCOVER_CARD;
      } else {
        this.cardType = null;
      }
    } else {
      this.cardType = null;
    }
  }

  async placeOrder() {
    const encrypt = new Encrypt();
    const encryptedData = {
      encryptedCardNumber: null,
      encryptedCvvNumber: null,
    };

    let cardNumber, cardMonth, cardYear, cvv;

    this.sub = this.paymentForm
      .get('cardHolderName')
      .valueChanges.subscribe((res) => {
        ORDER_PAYLOAD.cardHolder = this.paymentForm.get('cardHolderName').value;
      });

    this.sub = this.paymentForm
      .get('expiryMonth')
      .valueChanges.subscribe((res) => {
        cardMonth = this.paymentForm.get('expiryMonth').value.value;
        ORDER_PAYLOAD.expMonth = cardMonth;
      });

    this.sub = this.paymentForm
      .get('expiryYear')
      .valueChanges.subscribe((res) => {
        cardYear = this.paymentForm.get('expiryYear').value.value;
        ORDER_PAYLOAD.expYear = cardYear;
      });

    this.sub = this.paymentForm
      .get('cardNumber')
      .valueChanges.subscribe(async (res) => {
        cardNumber = this.paymentForm.get('cardNumber').value;
        encryptedData.encryptedCardNumber = await encrypt.encryptData(
          cardNumber.replace(/\s/g, ''),
          encrypt.generateCardKey(
            cardMonth.toString(),
            cardYear.toString(),
            cardNumber.replace(/\s/g, ''),
          ),
        );
        ORDER_PAYLOAD.cardNumber = encryptedData.encryptedCardNumber;
      });

    this.sub = this.paymentForm
      .get('cvvNumber')
      .valueChanges.subscribe(async (res) => {
        cvv = this.paymentForm.get('cvvNumber').value;
        encryptedData.encryptedCvvNumber = await encrypt.encryptData(
          cvv,
          encrypt.generateCVVKey(cardNumber),
        );
        ORDER_PAYLOAD.cvv = encryptedData.encryptedCvvNumber;
      });

    ORDER_PAYLOAD.phone = this.localStorageService.getData(
      LOCAL_STORAGE_KEY.PHONE,
    );
    ORDER_PAYLOAD.zipCode = this.localStorageService.getData(
      LOCAL_STORAGE_KEY.ZIPCODE,
    );
    ORDER_PAYLOAD.warehouseLocationId = this.localStorageService.getData(
      LOCAL_STORAGE_KEY.LOCATION_ID,
    );
    ORDER_PAYLOAD.giftCode = DEFAULT_GIFT_CODE;
    ORDER_PAYLOAD.type = DEFAULT_TYPE;
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
