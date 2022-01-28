import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MapService } from './map/map.service';
import { MapBoxComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [MapBoxComponent],
  providers: [MapService],
  exports: [MapBoxComponent],
})
export class MapModule {}
