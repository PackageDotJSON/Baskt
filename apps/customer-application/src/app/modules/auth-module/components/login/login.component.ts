import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '@baskt-mono-repo/socket';
import { LoginService } from '../../service/login.service';
import { AUTH_EVENTS } from '../../../../enums/socket-event-names.enum';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { AUTH_FUNCTIONS_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { ToastMessageService } from '../../../../services/toast-message-service/toast-message.service';
import { AuthService } from '../../service/auth.service';
import { AuthModel } from '../../../../models/auth.model';
import { DEVICE_TYPE } from '../../../../settings/app.settings';
import { ROUTER_URLS } from '../../../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isRegister = false;
  step = 1;
  disableButton = false;
  readonly registerUrl = ROUTER_URLS.REGISTER_URL;

  constructor(
    private socketService: SocketService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private messageService: ToastMessageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      phoneNumber: [null, [Validators.required]],
      pinNumber: [null, [Validators.required]],
    });
  }

  //Verify phone number of the user that he enters at login
  verifyPhone() {
    const payload = {
      phoneNumber: this.loginForm.value['phoneNumber'],
      email: '',
      isRegister: this.isRegister,
    };
    this.socketService.sendMessage(AUTH_EVENTS.VERIFY_PHONE, payload);
    (async () => {
      try {
        const data = await this.socketService.receivedJustSingleValue(
          AUTH_EVENTS.VERIFY_PHONE_RESPONSE,
        );
        if (data.status) {
          this.step = data.status === 1 ? 2 : 1;
          this.messageService.displayMessage('success', data.message);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        this.messageService.displayMessage('error', error);
      }
    })();
  }

  //Verify the OTP received by the user after entering the phone number
  verifyOtpPin() {
    const payload = {
      otp: this.loginForm.value['pinNumber'],
      phone: this.loginForm.value['phoneNumber'],
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
              data.message + ' Logging you in. Please wait...',
            );
            this.getStoreZipByPhone();
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

  //Initialize App Installation and get the required details from the backend
  getStoreZipByPhone() {
    this.loginForm.value['phoneNumber'] =
      this.loginForm.value['phoneNumber'].toString();
    const payload = new LambdaFunction(
      AUTH_FUNCTIONS_NAMES.APP_GET_STORE_AND_ZIP_BY_PHONE,
      {
        phone: this.loginForm.value['phoneNumber'],
      },
    );

    this.loginService.getStoreZipByPhone(payload).subscribe((zipCode) => {
      this.installApplication(
        this.loginForm.value['phoneNumber'],
        DEVICE_TYPE,
        zipCode,
      );
    });
  }

  installApplication(phone: string, deviceType = 'web', zipCode: string) {
    this.authService
      .installApplication(
        new LambdaFunction(
          AUTH_FUNCTIONS_NAMES.APP_INSTALL,
          new AuthModel(phone, deviceType, zipCode),
        ),
      )
      .subscribe((res) => {
        if (res) {
          this.router.navigateByUrl(ROUTER_URLS.HOME_URL);
        }
      });
  }
}
