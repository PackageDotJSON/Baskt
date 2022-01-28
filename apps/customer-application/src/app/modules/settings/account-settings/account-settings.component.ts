import { Component, OnInit } from '@angular/core';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { SETTINGS_FUNCTION_NAMES } from '../../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';
import { SettingsService } from '../service/settings.service';
import { ToastMessageService } from '../../../services/toast-message-service/toast-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'baskt-shop-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  userEmail: string;
  userZipCode: string;
  userPhone: string;
  enableButton = true;

  constructor(
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    private messageService: ToastMessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getAccountSettings();
  }

  valueChanged() {
    this.enableButton = false;
  }

  getAccountSettings() {
    const data = this.activatedRoute.snapshot.data['settings'].accountSettings;
    if (data.found === true) {
      this.userEmail = data.email;
      this.userZipCode = data.zipCode;
      this.userPhone = this.localStorageService.getData(
        LOCAL_STORAGE_KEY.PHONE,
      );
    }
  }

  updateAccountSettings() {
    const payload = new LambdaFunction(
      SETTINGS_FUNCTION_NAMES.APP_UPDATE_CUSTOMER_DETAILS,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        email: this.userEmail,
        zipCode: this.userZipCode,
      },
    );

    const subscriber = this.settingsService
      .setAccountSettings(payload)
      .subscribe((res) => {
        if (res.error === false) {
          this.messageService.displayMessage('success', res.mobileMessage);
          this.enableButton = true;
        }
        subscriber.unsubscribe();
      });
  }
}
