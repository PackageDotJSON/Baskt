import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';


//importing routes
import { ROUTES } from './routes/routes.constant';

//importing PrimeNg components
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

//importing components
import { StaticComponent } from './static.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { SafeAndSecureComponent } from './safe-and-secure/safe-and-secure.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { PrivacyRightsComponent } from './privacy-rights/privacy-rights.component';
import { EasyReturnsComponent } from './easy-returns/easy-returns.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsCardComponent } from './contact-us/component/contact-us-card.component';

//importing service
import { ContactUsService } from './contact-us/service/contact-us.service';

@NgModule({
  declarations: [
    StaticComponent,
    TermsAndConditionsComponent,
    SafeAndSecureComponent,
    ShippingPolicyComponent,
    PrivacyRightsComponent,
    EasyReturnsComponent,
    ContactUsComponent,
    ContactUsCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    InputMaskModule
  ],
  providers: [ContactUsService],
  exports: [TermsAndConditionsComponent, PrivacyRightsComponent],
})
export class StaticModule {}
