import { Injectable } from '@angular/core';
import { SERVICE_WORKER } from './serviceworker.enum';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { TokenService } from './token.service';

@Injectable()
export class FireBaseService {
  private fireBaseConfig: any;

  constructor(private tokenService: TokenService) {}

  setUpFirebase(
    ApiKey: string,
    AuthDomain: string,
    DatabaseURL: string,
    ProjectID: string,
    StorageBucket: string,
    MessagingSenderID: string,
    AppID: string,
    MeasurementID: string,
  ) {
    this.fireBaseConfig = {
      apiKey: ApiKey,
      authDomain: AuthDomain,
      databaseURL: DatabaseURL,
      projectId: ProjectID,
      storageBucket: StorageBucket,
      messagingSenderId: MessagingSenderID,
      appId: AppID,
      measurementId: MeasurementID,
    };
  }

  connectFireBase() {
    initializeApp(this.fireBaseConfig);
    navigator.serviceWorker
      .register(SERVICE_WORKER.serviceWorkerUrl)
      .then((registration) => {
        const message = getMessaging();
        getToken(message).then((currentToken) => {
          if (currentToken) {
            this.tokenService.setFcmToken('' + currentToken);
          }
        });
      });
  }
}
