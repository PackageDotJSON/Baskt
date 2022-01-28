import { Injectable } from '@angular/core';
import { ILambdaFunction } from '../../models/lambda-function.model';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';

@Injectable()
export class GiftsService {
  constructor(private http: HttpService) {}

  getCustomerScratchCard(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getBasktBucks(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getReferralUrl(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  validateGift(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
