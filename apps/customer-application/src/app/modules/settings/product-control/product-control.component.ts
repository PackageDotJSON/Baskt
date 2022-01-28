import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';
import { LambdaFunction } from '../../../models/lambda-function.model';
import { SETTINGS_FUNCTION_NAMES } from '../../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';
import { ToastMessageService } from '../../../services/toast-message-service/toast-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'baskt-shop-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.scss'],
})
export class ProductControlComponent implements OnInit {
  beyondBestBuy = false;
  allowUpdate = false;

  constructor(
    private settingsService: SettingsService,
    private localStorageService: LocalStorageService,
    private messageService: ToastMessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getProductControlSettings();
  }

  getProductControlSettings() {
    const data = this.activatedRoute.snapshot.data['settings'].productSettings;
    if (data.found === true) {
      this.beyondBestBuy = data.result.bbb;
    }
  }

  setProductControlSettings() {
    const payload = new LambdaFunction(
      SETTINGS_FUNCTION_NAMES.APP_UPDATE_CUSTOMER_PRODUCT_SELECTION_SETTING,
      {
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
        dinged: false,
        bbb: this.beyondBestBuy,
      },
    );
    this.settingsService.setProductControlSettings(payload).subscribe((res) => {
      if (res.found === true) {
        this.messageService.displayMessage('success', res.message);
      }
    });
  }
}
