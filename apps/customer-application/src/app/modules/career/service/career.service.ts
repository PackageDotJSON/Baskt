import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ILambdaFunction } from '../../../models/lambda-function.model';

@Injectable()

export class CareerService {

  constructor(private http: HttpService) {}

  uploadFile(payload: ILambdaFunction):Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  sendCareerData(){}
}
