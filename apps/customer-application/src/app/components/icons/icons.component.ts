import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from '../../state-management/state/user.state';
import { CartStore } from '../../state-management/store/cart.store';
import { ROUTER_URLS } from '../../enums/router-urls.enum';
import { LambdaFunction } from '../../models/lambda-function.model';
import { NOTIFICATIONS_FUNCTION_NAMES } from '../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';
import { NOTIFICATIONS_LIMIT } from '../../settings/app.settings';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'baskt-shop-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  readonly checkOutUrl = ROUTER_URLS.CHECK_OUT_STEP1;
  readonly ordersUrl = ROUTER_URLS.ORDERS_URL;
  readonly settingsUrl = ROUTER_URLS.SETTINGS_URL;
  readonly giftsUrl = ROUTER_URLS.GIFTS_URL;
  readonly notificationsUrl = ROUTER_URLS.NOTIFICATIONS_URL;
  isLogin$: Observable<boolean>;
  subIcons = false;
  showNotifications = false;
  cartItemsNumber$: Observable<number>;
  customerNotifications$: Observable<NotificationModel[]>;

  constructor(
    private userState: UserState,
    private cartStore: CartStore,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit() {
    this.isLogin$ = this.userState.userStatus();
    this.cartItemsNumber$ = this.cartStore.getCartLength();
    this.getCustomerNotifications();
  }

  getCustomerNotifications() {
    const payload = new LambdaFunction(
      NOTIFICATIONS_FUNCTION_NAMES.APP_GET_CUSTOMER_NOTIFICATIONS,
      {
        lastEvaluatedKey: '',
        limit: NOTIFICATIONS_LIMIT,
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.customerNotifications$ =
      this.notificationsService.getCustomerNotifications(payload);
  }

  logOutUser() {
    this.cartStore.unsubscribeCart();
    this.userState.logOutUser();
  }
}
