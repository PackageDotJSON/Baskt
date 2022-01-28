import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { UserState } from '../../state-management/state/user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userState: UserState) {}

  canActivate() {
    return this.routeActivationFunction();
  }

  canLoad(): boolean {
    return this.routeActivationFunction();
  }

  routeActivationFunction() {
    let isActivate = true;
    this.userState.userStatus().subscribe(
      (status) => {
        isActivate = status;
      },
      () => {
        isActivate = false;
      },
    );
    return isActivate;
  }
}
