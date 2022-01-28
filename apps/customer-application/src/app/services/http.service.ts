import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ILambdaFunction } from '../models/lambda-function.model';
import { BASE_URL } from '../constants/url';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  //Generic HTTP request to perform CRUD operations

  postHttpRequest(payload: ILambdaFunction): Observable<any> {
    return this.http.post(BASE_URL, payload).pipe(catchError(errorHandler));
  }
}

export function errorHandler(): Observable<Error> {
  return throwError('this is the error');
}
