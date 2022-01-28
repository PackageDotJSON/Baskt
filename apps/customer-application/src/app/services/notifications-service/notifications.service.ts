import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ILambdaFunction } from '../../models/lambda-function.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {
  constructor(private http: HttpService) {}

  getCustomerNotifications(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload).pipe(
      map((res) => {
        return res.items;
      }),
    );
  }
}
