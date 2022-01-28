import {Routes} from '@angular/router';
import {CheckoutStep1Component} from '../checkout/step1/checkout-step1.component';
import {CartGuard} from '../../../services/guards/cart.guard';
import {CheckoutStep2Component} from '../checkout/step2/checkout-step2.component';
import {CheckoutStep3Component} from '../checkout/step3/checkout-step3.component';
import {BillingComponent} from '../component/billing/billing.component';
import {AuthGuard} from '../../../services/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'checkout-1',
    canActivate: [AuthGuard, CartGuard],
    component: CheckoutStep1Component,
  },
  {
    path: 'checkout-2',
    canActivate: [AuthGuard, CartGuard],
    component: CheckoutStep2Component,
  },
  {
    path: 'checkout-3',
    canActivate: [AuthGuard, CartGuard],
    component: CheckoutStep3Component,
  },
  {
    path: '',
    component: BillingComponent,
    outlet: 'billing',
  },
];
