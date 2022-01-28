import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { STATIC_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { ContactUsService } from '../service/contact-us.service';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';

@Component({
  selector: 'baskt-shop-contact-us-card',
  templateUrl: './contact-us-card.component.html',
  styleUrls: ['./contact-us-card.component.scss'],
})
export class ContactUsCardComponent {
  contactUsForm: FormGroup;
  disableButton = false;
  homeUrl = ROUTER_URLS.HOME_URL;

  constructor(
    private router: Router,
    private contactUsService: ContactUsService,
    private messageService: ToastMessageService,
  ) {
    this.contactUsForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, Validators.required),
      userTelephone: new FormControl(null, Validators.required),
      userAddress: new FormControl(null, Validators.required),
      userSubject: new FormControl(null, Validators.required),
      userReason: new FormControl(null, Validators.required),
    });
  }

  submitContactData() {
    this.disableButton = true;
    const payload = new LambdaFunction(
      STATIC_FUNCTION_NAMES.APP_GET_CUSTOMER_FEEDBACK,
      {
        name: this.contactUsForm.value.userName,
        email: this.contactUsForm.value.userEmail,
        phone: this.contactUsForm.value.userTelephone,
        address: this.contactUsForm.value.userAddress,
        subject: this.contactUsForm.value.userSubject,
        detailText: this.contactUsForm.value.userReason,
      },
    );

    const subscriber = this.contactUsService
      .submitContactUsData(payload)
      .subscribe((res) => {
        if (res.success === true) {
          this.contactUsForm.reset();
          this.messageService.displayMessage('success', res.message);
          this.router.navigateByUrl(this.homeUrl);
        } else {
          this.disableButton = false;
          this.messageService.displayMessage('error', res.message);
        }
        subscriber.unsubscribe();
      });
  }
}
