import { Component } from '@angular/core';
import { ROUTER_URLS } from '../../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent {
  readonly registerUrl = ROUTER_URLS.REGISTER_URL;
  readonly loginUrl = ROUTER_URLS.LOGIN_URL;
}
