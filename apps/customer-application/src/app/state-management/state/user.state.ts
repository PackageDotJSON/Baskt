import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';
import { Router } from '@angular/router';
import { LambdaFunction } from '../../models/lambda-function.model';
import { AUTH_FUNCTIONS_NAMES } from '../../enums/lambda-functions-names.enum';
import { LogoutService } from '../../services/logout-service/logout.service';
import { tap } from 'rxjs/operators';
import { ROUTER_URLS } from '../../enums/router-urls.enum';

@Injectable({
  providedIn: 'root',
})
export class UserState implements OnDestroy {
  subscriber: Subscription;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private logOutService: LogoutService,
  ) {}

  private isLogin$ = new BehaviorSubject<boolean>(false);

  userStatus(): Observable<boolean> {
    if (this.localStorage.getData(LOCAL_STORAGE_KEY.TOKEN)) {
      this.isLogin$.next(true);
    }
    return this.isLogin$.asObservable();
  }

  logOutUser() {
    const payload = new LambdaFunction(AUTH_FUNCTIONS_NAMES.APP_LOG_OUT, {
      registrationId: '',
      phone: this.localStorage.getData(LOCAL_STORAGE_KEY.PHONE),
    });
    this.subscriber = this.logOutService
      .logOutUser(payload)
      .pipe(
        tap((res) => {
          if (res.status === 200) {
            this.isLogin$.unsubscribe();
            this.localStorage.clearLocalStorage();
            this.router.navigateByUrl(ROUTER_URLS.HOME_URL).then(res => {
              window.location.reload();
            });
          }
        }),
      )
      .subscribe();
  }

  unsubscribeUser() {
    this.isLogin$.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribeUser();
    this.subscriber.unsubscribe();
  }
}
