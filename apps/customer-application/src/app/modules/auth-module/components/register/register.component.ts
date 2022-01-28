import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '@baskt-mono-repo/socket';
import { TokenService } from '@baskt-mono-repo/firebase';
import { RegisterService } from '../../service/register.service';
import { AUTH_FUNCTIONS_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { AUTH_EVENTS } from '../../../../enums/socket-event-names.enum';
import { AuthModel } from '../../../../models/auth.model';

/*Importing not in area error that is a long string
  stored in a variable in settings directory*/
import { NOT_IN_AREA_ERROR } from '../../../../constants/app.error';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  step = 1;
  isRegister = true;
  disableButton = false;
  readonly loginUrl = ROUTER_URLS.LOGIN_URL;

  constructor(
    private router: Router,
    private socketService: SocketService,
    private registerService: RegisterService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private messageService: ToastMessageService,
  ) {
    this.registerForm = this.formBuilder.group({
      zipCode: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      userEmail: [null, [Validators.required]],
      referralCode: [null, [Validators.required]],
      pinNumber: [null, [Validators.required]],
    });
  }

  /* A single generic button is used that executes the certain function
     depending upon the step the user is at */
  registerFunction() {
    switch (this.step) {
      case 1:
        this.verifyZipCode();
        break;
      case 2:
        this.verifyPhone();
        break;
      case 3:
        this.verifyOtpPin();
        break;
    }
  }

  //Verify the Zip Code of the new user
  verifyZipCode() {
    const payload = new LambdaFunction(
      AUTH_FUNCTIONS_NAMES.APP_VERIFY_ZIP_CODE,
      {
        zipCode: this.registerForm.value['zipCode'],
      },
    );

    this.registerService.verifyZipCode(payload).subscribe((res) => {
      if (res.found === true) {
        this.step = 2;
        this.messageService.displayMessage('success', res.message);
      } else if (res.found === false) {
        this.step = 4;
        this.messageService.displayMessage('info', NOT_IN_AREA_ERROR);
      }
    });
  }

  //Verify the phone number of the new user
  verifyPhone() {
    const payload = {
      phoneNumber: this.registerForm.value['phoneNumber'],
      email: this.registerForm.value['userEmail'],
      isRegister: this.isRegister,
    };
    this.socketService.sendMessage(AUTH_EVENTS.VERIFY_PHONE, payload);
    (async () => {
      try {
        const data = await this.socketService.receivedJustSingleValue(
          AUTH_EVENTS.VERIFY_PHONE_RESPONSE,
        );
        if (data.status == 1) {
          this.step = 3;
          this.messageService.displayMessage('success', data.message);
        } else if (data.status == 0) {
          this.step = 2;
          this.messageService.displayMessage('error', data.message);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        this.messageService.displayMessage('error', error);
      }
    })();
  }

  //Verify the OTP of the new user
  verifyOtpPin() {
    const payload = {
      otp: this.registerForm.value['pinNumber'],
      phone: this.registerForm.value['phoneNumber'],
    };

    this.socketService.sendMessage(AUTH_EVENTS.VERIFY_OTP, payload);
    (async () => {
      try {
        const data = await this.socketService.receivedJustSingleValue(
          AUTH_EVENTS.VERIFY_OTP_RESPONSE,
        );
        if (data) {
          if (data.status == 1) {
            this.disableButton = true;
            this.messageService.displayMessage(
              'success',
              data.message + ' User successfully registered. Redirecting...',
            );
            this.registerUser();
          } else if (data.status != 1) {
            this.messageService.displayMessage('error', data.message);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        this.messageService.displayMessage('error', error);
      }
    })();
  }

  //Register the user by sending all the required details to the backend
  registerUser() {
    this.registerForm.value['phoneNumber'] =
      this.registerForm.value['phoneNumber'].toString();
    this.registerForm.value['zipCode'] =
      this.registerForm.value['zipCode'].toString();

    const payload = new LambdaFunction(
      AUTH_FUNCTIONS_NAMES.APP_INSTALL,
      new AuthModel(
        this.registerForm.value['phoneNumber'],
        'web',
        this.registerForm.value['zipCode'],
        this.tokenService.getFcmToken() || null,
        this.registerForm.value['referralCode'],
        this.registerForm.value['userEmail'],
      ),
    );

    this.registerService.registerUser(payload).subscribe((res) => {
      this.messageService.displayMessage('success', res.body.msg);
      this.router.navigateByUrl(ROUTER_URLS.LOGIN_URL);
    });
  }

  //Incase, BASKT is not in the user's area, let him subscribe
  subscribeEmail() {
    this.disableButton = true;
    const payload = new LambdaFunction(
      AUTH_FUNCTIONS_NAMES.APP_SUBSCRIBE_EMAIL,
      {
        zipCode: this.registerForm.value['zipCode'],
        email: this.registerForm.value['userEmail'],
      },
    );
    this.registerService.subscribeEmail(payload).subscribe((res) => {
      if (res.success == true) {
        this.messageService.displayMessage('success', res.message);
        this.router.navigateByUrl(ROUTER_URLS.HOME_URL);
      } else {
        this.messageService.displayMessage('error', res.message);
      }
    });
  }

  //Take the user back to the starting step
  goToPreviousState() {
    this.step = 1;
  }
}
