import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { LambdaFunction } from '../../models/lambda-function.model';
import { NOTIFICATIONS_FUNCTION_NAMES } from '../../enums/lambda-functions-names.enum';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';
import { Observable } from 'rxjs';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'baskt-shop-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit{
  customerNotifications$: Observable<NotificationModel[]>;

  constructor(
    private notificationsService: NotificationsService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.getAllCustomerNotifications();
  }

  getAllCustomerNotifications() {
    const payload = new LambdaFunction(
      NOTIFICATIONS_FUNCTION_NAMES.APP_GET_CUSTOMER_NOTIFICATIONS,
      {
        lastEvaluatedKey: '',
        limit: '',
        phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
      },
    );
    this.customerNotifications$ =
      this.notificationsService.getCustomerNotifications(payload);
  }
}
