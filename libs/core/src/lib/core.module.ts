//importing modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

//importing components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

//importing services
import { LoadingService } from './components/loader/loader.service';
@NgModule({
  imports: [CommonModule, RouterModule, CardModule, SkeletonModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
  ],
  providers: [LoadingService],
})
export class CoreModule {}
