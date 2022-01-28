import { Component } from '@angular/core';
import { ROUTER_URLS } from '../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  readonly homeUrl = ROUTER_URLS.HOME_URL;
}
