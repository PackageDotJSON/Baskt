import { ProductResolver } from '../services/product-service/resolvers/product.resolver';
import { Routes } from '@angular/router';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from '../pages/product-details/product-details.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { FavouriteProductDetailsComponent } from '../pages/favourite-product-details/favourite-product-details.component';
import { ProductListResolver } from '../services/product-service/resolvers/product-list.resolver';
import { AuthGuard } from '../services/guards/auth.guard';
import { CartGuard } from '../services/guards/cart.guard';
import { CartComponent } from '../modules/cart/cart.component';
import { OrdersComponent } from '../modules/orders/orders.component';
import { StaticComponent } from '../modules/static/static.component';
import { SettingsComponent } from '../modules/settings/settings.component';
import { GiftsComponent } from '../pages/gifts/gifts.component';
import { CareerComponent } from '../modules/career/career.component';
import { AuthModuleGuard } from '../services/guards/auth-module.guard';
import { NotificationsComponent } from '../pages/notifications/notifications.component';

export const ROUTES: Routes = [
  // LAZY LOAD MODULES

  // LOAD COMPONENTS
  {
    path: '',
    component: LandingPageComponent,
    resolve: {
      products: ProductListResolver,
    },
    children: [
      { path: '', component: ProductListComponent },
      { path: 'favourites', component: FavouriteProductDetailsComponent },
      { path: 'gifts', component: GiftsComponent },
      { path: 'notifications', component: NotificationsComponent },
      {
        path: 'user',
        canLoad: [AuthModuleGuard],
        loadChildren: () =>
          import('../modules/auth-module/auth.module').then(
            (m) => m.AuthModule,
          ),
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('../modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'cart',
        component: CartComponent,
        canLoad: [AuthGuard, CartGuard],
        loadChildren: () =>
          import('../modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'public',
        component: StaticComponent,
        loadChildren: () =>
          import('../modules/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: 'settings',
        component: SettingsComponent,
        loadChildren: () =>
          import('../modules/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
      },
      {
        path: 'career',
        component: CareerComponent,
        loadChildren: () =>
          import('../modules/career/career.module').then((m) => m.CareerModule),
      },
      {
        path: ':upc',
        component: ProductDetailsComponent,
        resolve: {
          products: ProductResolver,
        },
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
