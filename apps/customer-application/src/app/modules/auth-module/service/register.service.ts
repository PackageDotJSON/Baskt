import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable } from 'rxjs';
import { ILambdaFunction } from '../../../models/lambda-function.model';

@Injectable()
export class RegisterService {
  constructor(private http: HttpService) {}

  verifyZipCode(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  registerUser(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  subscribeEmail(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
