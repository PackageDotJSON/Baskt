import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  fcmToken: any;

  setFcmToken(token: any) {
    this.fcmToken = token;
  }

  getFcmToken() {
    return this.fcmToken;
  }
}
