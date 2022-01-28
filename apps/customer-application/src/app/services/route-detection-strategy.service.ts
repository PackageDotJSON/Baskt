import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteDetectionStrategyService implements OnDestroy {
  private route$ = new BehaviorSubject<string>('');

  constructor(public router: Router) {}

  currentRoute(): Observable<string> {
    this.router.events
      .pipe(
        tap((route) => {
          if (route instanceof NavigationStart) {
            console.log('start url=======>', route.url);
          }
          if (route instanceof NavigationEnd) {
            console.log('end url=======>', route.url);
            this.route$.next(route.url as string);
          }
        }),
      )
      .subscribe();
    return this.route$.asObservable();
  }

  ngOnDestroy() {
    this.route$.complete();
    this.route$.unsubscribe();
  }
}
