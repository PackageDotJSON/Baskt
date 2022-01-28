import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ILambdaFunction } from '../../../models/lambda-function.model';
import { Observable } from 'rxjs';

@Injectable()
export class CartService {
  constructor(private http: HttpService) {}

  validateCouponCode(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getBasktBucks(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getDeliveryAmount(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getDeliveryTimeLimit(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getCustomerLocation(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  verifyLocalProducts(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  addCustomerLocation(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  clearCart(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  placeOrder(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
