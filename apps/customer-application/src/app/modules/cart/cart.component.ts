import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ROUTER_URLS } from '../../enums/router-urls.enum';

@Component({
  selector: 'baskt-shop-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Cart', routerLink: ROUTER_URLS.CHECK_OUT_STEP1 },
      { label: 'Address & Time', routerLink: ROUTER_URLS.CHECK_OUT_STEP2 },
      { label: 'Payment', routerLink: ROUTER_URLS.CHECK_OUT_STEP3 },
    ];
  }
}
