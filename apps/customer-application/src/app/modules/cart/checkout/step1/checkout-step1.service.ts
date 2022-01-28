import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { LambdaFunction } from '../../../../models/lambda-function.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { CART_FUNCTION_NAMES } from '../../../../enums/lambda-functions-names.enum';
import { LOCAL_STORAGE_KEY } from '../../../../enums/local-storage-keys.enums';

@Injectable()
export class CheckoutStep1Service {
  constructor(
    private http: HttpService,
    private localStorageService: LocalStorageService,
  ) {}

  clearCart(): Observable<any> {
    const payload = new LambdaFunction(CART_FUNCTION_NAMES.ADMIN_CLEAR_CART, {
      phone: this.localStorageService.getData(LOCAL_STORAGE_KEY.PHONE),
    });
    return this.http.postHttpRequest(payload);
  }
}
