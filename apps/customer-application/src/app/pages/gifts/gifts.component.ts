import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GiftsService } from '../../services/gifts-service/gifts.service';
import { LambdaFunction } from '../../models/lambda-function.model';
import {
  CART_FUNCTION_NAMES,
  GIFT_FUNCTION_NAMES,
} from '../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SEARCH_DEBOUNCE_TIME } from '../../settings/app.settings';
import { ToastMessageService } from '../../services/toast-message-service/toast-message.service';

@Component({
  selector: 'baskt-shop-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss'],
})
export class GiftsComponent implements OnInit, AfterViewInit {
  @ViewChild('giftCode') giftCode: ElementRef;
  basktBucks$: Observable<any>;

  constructor(
    private giftsService: GiftsService,
    private localStorageService: LocalStorageService,
    private messageService: ToastMessageService,
  ) {}

  ngOnInit() {
    this.getCustomerScratchCard();
    this.getCustomerBasktBucks();
    this.getReferralUrl();
  }

  ngAfterViewInit() {
    fromEvent(this.giftCode.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(SEARCH_DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((code) => {
        this.validateGift(code);
      });
  }

  getCustomerScratchCard() {
    const payload = new LambdaFunction(
      GIFT_FUNCTION_NAMES.APP_GET_CUSTOMER_SCRATCH_CARD,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.giftsService.getCustomerScratchCard(payload);
  }

  getCustomerBasktBucks() {
    const payload = new LambdaFunction(
      CART_FUNCTION_NAMES.APP_GET_CUSTOMER_BASKT_BUCKS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.basktBucks$ = this.giftsService.getBasktBucks(payload);
  }

  getReferralUrl() {
    const payload = new LambdaFunction(
      GIFT_FUNCTION_NAMES.APP_GET_REFERRAL_URL,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.giftsService.getReferralUrl(payload);
  }

  validateGift(payloadCode) {
    const payload = new LambdaFunction(GIFT_FUNCTION_NAMES.APP_VALIDATE_GIFT, {
      phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      giftCode: payloadCode,
    });
    const subscriber = this.giftsService
      .validateGift(payload)
      .subscribe((res) => {
        if (res.body.status === 0) {
          this.messageService.displayMessage('error', res.body.msg);
        } else {
          this.messageService.displayMessage('success', res.body.msg);
        }
        subscriber.unsubscribe();
      });
  }
}
