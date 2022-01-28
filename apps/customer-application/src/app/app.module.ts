//Importing built-in libraries

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//importing user defined libraries

import { ROUTES } from './routes/routes';

//Importing services

import { HttpService } from './services/http.service';
import { ProductSerivce } from './services/product-service/product.service';
import { CartService } from './services/cart-service/cart.service';
import { GiftsService } from './services/gifts-service/gifts.service';
import { ToastMessageService } from './services/toast-message-service/toast-message.service';
import { NotificationsService } from './services/notifications-service/notifications.service';

//importing guards

import { AuthGuard } from './services/guards/auth.guard';
import { CustomErrorHandler } from './error-handler/custom-error-handler';
import { RouteDetectionStrategyService } from './services/route-detection-strategy.service';
import { JWTInterceptor } from './services/interceptor/JWT.interceptor';
import { AuthModuleGuard } from './services/guards/auth-module.guard';

// Importing #3rd parties

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';

//Importing components

import { AppComponent } from './app.component';
import { LoginCardComponent } from './components/card/login-card/login-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartItemsCardComponent } from './components/card/cart-items-card/cart-items-card.component';
import { FavouriteProductsCardComponent } from './components/card/favourite-products-card/favourite-products-card.component';
import { IconsComponent } from './components/icons/icons.component';

//Importing components of pages

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FavouriteProductDetailsComponent } from './pages/favourite-product-details/favourite-product-details.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

//Importing Pipes

import { IndexOfPipe } from './pipes/carousel.pipe';

// Importing custom Library Module
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from '@baskt-mono-repo/core';
import { FirebaseModule } from '@baskt-mono-repo/firebase';
import { SocketModule } from '@baskt-mono-repo/socket';
import {
  LocalStorageModule,
  LocalStorageService,
} from '@baskt-mono-repo/local-storage';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    LoginCardComponent,
    ProductListComponent,
    PageNotFoundComponent,
    LandingPageComponent,
    NotificationsComponent,
    CarouselComponent,
    FilterComponent,
    SearchComponent,
    ProductDetailsComponent,
    GiftsComponent,
    CartItemsCardComponent,
    FavouriteProductsCardComponent,
    FavouriteProductDetailsComponent,
    IconsComponent,

    //Pipes
    IndexOfPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([...ROUTES], { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    FormsModule,

    // NgPrime Module
    CardModule,
    CarouselModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    InputSwitchModule,
    ToastModule,
    ImageModule,
    BadgeModule,

    // Custom Library
    SharedModule,
    CoreModule,
    FirebaseModule,
    SocketModule,
    LocalStorageModule,
  ],
  providers: [
    HttpService,

    AuthGuard,
    AuthModuleGuard,

    LocalStorageService,
    MessageService,
    ToastMessageService,

    ProductSerivce,
    CartService,
    GiftsService,
    NotificationsService,
    RouteDetectionStrategyService,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
