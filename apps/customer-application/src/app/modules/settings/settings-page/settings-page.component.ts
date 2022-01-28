import { Component } from '@angular/core';

@Component({
  selector: 'baskt-shop-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  accountSettings = true;
  productSettings = false;

  showAccountSettings() {
    this.accountSettings = true;
    this.productSettings = false;
  }

  showProductSettings() {
    this.productSettings = true;
    this.accountSettings = false;
  }
}
