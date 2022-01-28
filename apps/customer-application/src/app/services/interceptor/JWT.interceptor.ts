import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserState } from '../../state-management/state/user.state';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private userState: UserState,
    private localStorageService: LocalStorageService,
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let userState;
    let jwtToken;
    this.userState.userStatus().subscribe((res) => {
      userState = res;
    });
    if (userState === true) {
      jwtToken = this.localStorageService.getData(LOCAL_STORAGE_KEY.TOKEN);
    }
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return next.handle(httpRequest);
  }
}
