import { Routes } from '@angular/router';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { SafeAndSecureComponent } from '../safe-and-secure/safe-and-secure.component';
import { ShippingPolicyComponent } from '../shipping-policy/shipping-policy.component';
import { PrivacyRightsComponent } from '../privacy-rights/privacy-rights.component';
import { EasyReturnsComponent } from '../easy-returns/easy-returns.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

export const ROUTES: Routes = [
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  { path: 'safe-and-secure', component: SafeAndSecureComponent },
  { path: 'shipping-policy', component: ShippingPolicyComponent },
  { path: 'privacy-rights', component: PrivacyRightsComponent },
  { path: 'easy-returns', component: EasyReturnsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];
