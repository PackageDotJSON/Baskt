import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MapService } from './map.service';
import {
  DEFAULT_COORDINATES,
  STORE_COORDINATES,
  GEO_JSON,
  CIRCLE_GEO_JSON,
  BASKT_OPERATIONAL_ERROR,
} from './map.constant';

import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'baskt-mono-repo-map-box',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapBoxComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('coordsElement') coordsElement!: ElementRef;
  @ViewChild('storeElement') storeElement!: ElementRef;
  @Input() MapboxToken = '';
  @Input() style = '';
  @Input() zoom = 10;
  distanceFromStore: any;

  canvas: any;

  public map!: mapboxgl.Map;

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.map = this.InitializeMap();
    this.resizeMap();
    this.canvas = this.map.getCanvasContainer();
    this.getUserLocation();
    this.addControls();
    this.addBasktPopUp();
    this.addDeliveryCircle();
    this.getLocationFromCoords();
  }

  //initialize a map
  InitializeMap(): mapboxgl.Map {
    return new mapboxgl.Map({
      accessToken: this.MapboxToken,
      container: this.mapElement.nativeElement,
      style: this.style,
      zoom: this.zoom,
      center: [DEFAULT_COORDINATES.longitude, DEFAULT_COORDINATES.latitude],
    });
  }

  //adjust the map according to the PrimeNG dialog
  resizeMap() {
    this.map.on('idle', () => {
      this.map.resize();
    });
  }

  //add controls to the map
  addControls() {
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: this.MapboxToken,
        mapboxgl: this.map,
      }),
    );
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
  }

  //get user location
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        DEFAULT_COORDINATES.longitude = position.coords.longitude;
        DEFAULT_COORDINATES.latitude = position.coords.latitude;

        this.addDraggablePoint(DEFAULT_COORDINATES);

        //fly to user location
        this.map.flyTo({
          center: [DEFAULT_COORDINATES.longitude, DEFAULT_COORDINATES.latitude],
          essential: true,
        });

        //add a popup at user location
        new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([
            DEFAULT_COORDINATES.longitude,
            DEFAULT_COORDINATES.latitude,
          ])
          .setHTML('<span>You are here</span>')
          .addTo(this.map);
      });
    }
  }

  //add baskt store location on map
  addBasktPopUp() {
    //create baskt marker image
    const basktIcon = document.createElement('testmap');
    basktIcon.style.width = '57px';
    basktIcon.style.height = '57px';
    basktIcon.style.backgroundImage = 'url(/assets/store-icon-marker.png)';
    basktIcon.style.cursor = 'pointer';

    //set marker at store location
    new mapboxgl.Marker(basktIcon)
      .setLngLat([STORE_COORDINATES.longitude, STORE_COORDINATES.latitude])
      .addTo(this.map);

    //set pop up at store location
    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([STORE_COORDINATES.longitude, STORE_COORDINATES.latitude])
      .setHTML('<span>Baskt Store</span>')
      .addTo(this.map);
  }

  //add a circle to the area near Baskt Store
  addDeliveryCircle() {
    this.map.on('load', () => {
      this.map.addSource('pointDelivery', {
        type: 'geojson',
        data: CIRCLE_GEO_JSON,
      });

      const metersToPixelZoom = (meters: any, latitude: any) => {
        const zoomLevel = 22;
        return (
          meters /
          (78271.484 / 2 ** zoomLevel) /
          Math.cos((latitude * Math.PI) / 180)
        );
      };

      this.map.addLayer({
        id: 'pointDelivery',
        type: 'circle',
        source: 'pointDelivery',
        paint: {
          'circle-radius': {
            base: 2,
            stops: [
              [0, 0],
              [22, metersToPixelZoom(98000, STORE_COORDINATES.latitude)],
            ],
          },
          'circle-stroke-color': '#52FF33',
          'circle-stroke-width': 2,
          'circle-color': '#52FF33',
          'circle-opacity': 0.1,
        },
      });
    });
  }

  //create a draggable point
  addDraggablePoint(value: any) {
    this.map.on('load', () => {
      GEO_JSON.features[0].geometry.coordinates = [
        value.longitude,
        value.latitude,
      ];
      this.map.addSource('point', {
        type: 'geojson',
        data: GEO_JSON,
      });

      this.map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'point',
        paint: {
          'circle-radius': 10,
          'circle-color': '#F84C4C', // red color
        },
      });

      // When the cursor enters a feature in
      // the point layer, prepare for dragging.
      this.map.on('mouseenter', 'point', () => {
        this.map.setPaintProperty('point', 'circle-color', '#3bb2d0');
        this.canvas.style.cursor = 'move';
      });

      this.map.on('mouseleave', 'point', () => {
        this.map.setPaintProperty('point', 'circle-color', '#3887be');
        this.canvas.style.cursor = '';
      });

      this.map.on('mousedown', 'point', (e) => {
        // Prevent the default map drag behavior.
        e.preventDefault();

        this.canvas.style.cursor = 'grab';

        this.map.on('mousemove', this.onMove);
        this.map.once('mouseup', this.onUp);
      });

      this.map.on('touchstart', 'point', (e) => {
        if (e.points.length !== 1) return;

        // Prevent the default map drag behavior.
        e.preventDefault();

        this.map.on('touchmove', this.onMove);
        this.map.once('touchend', this.onUp);
      });
    });
  }

  onMove = (e: any) => {
    const coords = e.lngLat;
    DEFAULT_COORDINATES.longitude = coords.lng;
    DEFAULT_COORDINATES.latitude = coords.lat;

    // Set a UI indicator for dragging.
    this.canvas.style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    GEO_JSON.features[0].geometry.coordinates = [coords.lng, coords.lat];
    const source: mapboxgl.GeoJSONSource = this.map.getSource(
      'point',
    ) as mapboxgl.GeoJSONSource;
    source.setData(GEO_JSON);
  };

  onUp = (e: any) => {
    const coords = e.lngLat;
    DEFAULT_COORDINATES.longitude = coords.lng;
    DEFAULT_COORDINATES.latitude = coords.lat;

    this.distanceFromStore = this.calculateExpressDelivery(
      STORE_COORDINATES.latitude,
      STORE_COORDINATES.longitude,
      DEFAULT_COORDINATES.latitude,
      DEFAULT_COORDINATES.longitude,
    ).toFixed(2);

    this.canvas.style.cursor = '';
    this.getLocationFromCoords();
    // Unbind mouse/touch events
    this.map.off('mousemove', this.onMove);
    this.map.off('touchmove', this.onUp);
  };

  //convert location coordinates from dragged pointer to location name
  getLocationFromCoords() {
    let locationName;
    let zipCode;

    this.mapService
      .getPlaceFromCoords(DEFAULT_COORDINATES, this.MapboxToken)
      .subscribe((res: any) => {
        locationName = res.features[0].place_name;
        zipCode = Number(res.features[1].text);

        // Print the location name of where the point had
        // finished being dragged to on the map.
        this.coordsElement.nativeElement.style.display = 'block';
        this.coordsElement.nativeElement.innerHTML = `${locationName}`;

        if (!locationName.includes('United States')) {
          this.storeElement.nativeElement.style.display = 'block';
          this.storeElement.nativeElement.innerHTML = BASKT_OPERATIONAL_ERROR;
        } else {
          this.storeElement.nativeElement.style.display = 'none';
        }
        const obj = {
          locationName: locationName,
          zipCode: zipCode,
          distanceFromStore: this.distanceFromStore,
          longitude: DEFAULT_COORDINATES.longitude,
          latitude: DEFAULT_COORDINATES.latitude
        };

        this.mapService.setMapLocation(obj);
      });
  }

  //calculate distance between the draggable point coordinates and the store coordinates
  calculateExpressDelivery(
    latStore: any,
    lonStore: any,
    latPoint: any,
    lonPoint: any,
  ) {
    const toRadians = (deg: any) => {
      return deg * (Math.PI / 180);
    };

    const radEarth = 6371; // Radius of the earth in km
    const resultLat = toRadians(latPoint - latStore);
    const resultLon = toRadians(lonPoint - lonStore);
    const a =
      Math.sin(resultLat / 2) * Math.sin(resultLat / 2) +
      Math.cos(toRadians(latStore)) *
        Math.cos(toRadians(latPoint)) *
        Math.sin(resultLon / 2) *
        Math.sin(resultLon / 2);

    const cirEarth = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceToStore = radEarth * cirEarth; // Distance in km
    return distanceToStore;
  }
}
