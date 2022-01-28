import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

//importing PrimeNg modules
import {StepsModule} from 'primeng/steps';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {SharedModule} from '../shared/shared.module';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';

//importing components
import {CartComponent} from './cart.component';
import {BillingComponent} from './component/billing/billing.component';
import {CheckoutStep1Component} from './checkout/step1/checkout-step1.component';
import {CheckoutStep2Component} from './checkout/step2/checkout-step2.component';
import {CheckoutStep3Component} from './checkout/step3/checkout-step3.component';
import {StaticModule} from '../static/static.module';

//importing service
import {CartGuard} from '../../services/guards/cart.guard';
import {MessageService} from 'primeng/api';
import {CartService} from './service/cart.service';

//importing libraries
import {MapModule} from '@baskt-mono-repo/map';

//importing routes
import {ROUTES} from './routes/routes';
import {CheckoutStep1Service} from "./checkout/step1/checkout-step1.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MapModule,
    SharedModule,
    StaticModule,
    StepsModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputSwitchModule,
    ButtonModule,
    CardModule,
    ToastModule,
    DropdownModule,
    SliderModule,
    DialogModule,
    CheckboxModule,
  ],
  declarations: [
    CartComponent,
    BillingComponent,
    CheckoutStep1Component,
    CheckoutStep2Component,
    CheckoutStep3Component,
  ],
  providers: [
    CartGuard,
    CheckoutStep1Service,
    CartService,
    MessageService,
  ],
})
export class CartModule {
}
