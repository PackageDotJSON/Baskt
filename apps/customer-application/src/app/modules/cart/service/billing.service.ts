import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})

export class BillingService implements OnDestroy{
  private deliveryFee$ = new BehaviorSubject<number>(5);

  setDeliveryFee(fee: number) {
    this.deliveryFee$.next(fee);
  }

  getDeliveryFee() {
    return this.deliveryFee$.asObservable();
  }

  ngOnDestroy() {
    this.deliveryFee$.unsubscribe();
  }
}
