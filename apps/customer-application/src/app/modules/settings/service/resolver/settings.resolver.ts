import { Injectable } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { SETTINGS_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';

@Injectable()
export class SettingsResolver implements Resolve<any> {
  constructor(
    private settingsService: SettingsService,
    private localStorageService: LocalStorageService,
  ) {}

  resolve(): Observable<any> {
    const payloadAccountSettings = new LambdaFunction(
      SETTINGS_FUNCTION_NAMES.APP_GET_CUSTOMER_DETAILS_BY_PHONE,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );

    const payloadProductSettings = new LambdaFunction(
      SETTINGS_FUNCTION_NAMES.APP_GET_CUSTOMER_PRODUCT_SELECTION_SETTING,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );

    return forkJoin({
      accountSettings: this.settingsService.getAccountSettings(
        payloadAccountSettings,
      ),
      productSettings: this.settingsService.getProductSelectionSettings(
        payloadProductSettings,
      ),
    });
  }
}
