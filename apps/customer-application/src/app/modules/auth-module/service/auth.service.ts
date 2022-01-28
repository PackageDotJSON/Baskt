import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILambdaFunction } from '../../../models/lambda-function.model';
import { LOCAL_STORAGE_KEY } from '../../../enums/local-storage-keys.enums';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
  ) {}

  installApplication(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload).pipe(
      tap((res) => {
        const {
          statusCode,
          body: { accessToken },
        } = res;
        if (statusCode === 200) {
          this.storeJWTToken(accessToken);
        }
      }),
    );
  }

  private storeJWTToken(accessToken: string) {
    this.localStorage.setData(LOCAL_STORAGE_KEY.TOKEN, accessToken);
  }
}
