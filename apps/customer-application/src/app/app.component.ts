import { Component } from '@angular/core';
import { FireBaseService } from '@baskt-mono-repo/firebase';
import { ROUTER_URLS } from './enums/router-urls.enum';
import { environment } from '../environments/environment';

@Component({
  selector: 'baskt-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly homeUrl = ROUTER_URLS.HOME_URL;

  constructor(private firebaseService: FireBaseService) {
    this.setUpFirebase();
  }

  setUpFirebase() {
    this.firebaseService.setUpFirebase(
      environment.API_KEY,
      environment.AUTH_DOMAIN,
      environment.DATABASE_URL,
      environment.PROJECT_ID,
      environment.STORAGE_BUCKET,
      environment.MESSAGING_SENDER_ID,
      environment.APP_ID,
      environment.MEASUREMENT_ID,
    );
    this.firebaseService.connectFireBase();
  }
}
