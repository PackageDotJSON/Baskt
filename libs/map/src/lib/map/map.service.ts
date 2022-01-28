import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MapService implements OnDestroy {
  private MapLocation = new BehaviorSubject<any>('');
  private coordinates: any;
  private MapboxToken: any;

  constructor(private http: HttpClient) {}

  getPlaceFromCoords(coords: any, token: any) {
    this.coordinates = coords;
    this.MapboxToken = token;
    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.coordinates.longitude},${this.coordinates.latitude}.json?access_token=${this.MapboxToken}`,
    );
  }

  setMapLocation(location: any) {
    this.MapLocation.next(location);
  }

  getMapLocation(): Observable<any> {
    return this.MapLocation.asObservable();
  }

  ngOnDestroy() {
    this.MapLocation.unsubscribe();
  }
}
