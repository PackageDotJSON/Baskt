import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { ILambdaFunction } from '../../models/lambda-function.model';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private http: HttpService
  ) {}

  logOutUser(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
