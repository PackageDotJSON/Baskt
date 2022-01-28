import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILambdaFunction } from '../../../models/lambda-function.model';

@Injectable()
export class OrdersService {
  constructor(private http: HttpService) {}

  getOrders(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getOrderDetailsById(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  refundItem(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  rateOrder(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  trackOrder(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
}
