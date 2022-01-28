import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ContactUsService {
  constructor(private http: HttpService) {}

  submitContactUsData(payload): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
