import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ILambdaFunction } from '../../../models/lambda-function.model';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(private http: HttpService) {}

  getAccountSettings(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  setAccountSettings(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  getProductSelectionSettings(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  setProductControlSettings(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
