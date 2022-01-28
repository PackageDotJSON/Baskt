import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ILambdaFunction } from '../../../models/lambda-function.model';
import { HttpService } from '../../../services/http.service';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
  ) {}

  getStoreZipByPhone(payload: ILambdaFunction): Observable<string> {
    let num = payload.payload;
    num = JSON.stringify(num).slice(10, 20);
    return this.http.postHttpRequest(payload).pipe(
      tap((res) => {
        this.localStorage.setData(
          LOCAL_STORAGE_KEY.LOCATION_ID,
          res.locationId,
        );
        this.localStorage.setData(LOCAL_STORAGE_KEY.ZIPCODE, res.zipCode);
        this.localStorage.setData(LOCAL_STORAGE_KEY.PHONE, num);
      }),
      map((res) => {
        return res.zipCode;
      }),
    );
  }
}
