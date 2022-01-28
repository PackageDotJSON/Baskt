import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import {LoadingService} from './loader.service';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'baskt-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() routing = false;
  @Input() detectRoutingOngoing = false;

  public showOverlay = true;

  constructor(public loadingService: LoadingService, private router: Router) {
  }

  ngOnInit() {
    if (this.detectRoutingOngoing) {
      this.router.events.subscribe((event) => {
        if (
          event instanceof NavigationStart ||
          event instanceof RouteConfigLoadStart
        ) {
          this.showOverlay = true;
          this.loadingService.loadingOn();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ) {
          this.showOverlay = false;
          this.loadingService.loadingOff();
          event instanceof NavigationError ? console.error(event.error) : '';
        }
      });
    }
  }
}
