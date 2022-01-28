import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//importing Nx Library
import { CoreModule } from '@baskt-mono-repo/core';

//importing PrimeNg Modules
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepsModule } from 'primeng/steps';
import { AccordionModule } from 'primeng/accordion';

//importing components
import { OrdersComponent } from './orders.component';
import { OrdersCardComponent } from './component/orders-card/orders-card.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { RatingCardComponent } from './component/rating-card/rating-card.component';
import { ContactDriverCardComponent } from './component/contact-driver-card/contact-driver-card.component';

//importing services
import { OrdersService } from './service/orders.service';
import { OrderResolver } from './service/resolver/order.resolver';
import { MessageService } from 'primeng/api';

//initializing child routes
const ROUTES: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    resolve: {
      orders: OrderResolver,
    },
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
  },
  {
    path: 'track-order',
    component: TrackOrderComponent,
  },
];

@NgModule({
  declarations: [
    OrdersComponent,
    OrdersCardComponent,
    OrderPageComponent,
    OrderDetailsComponent,
    TrackOrderComponent,
    RatingCardComponent,
    ContactDriverCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    CoreModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ImageModule,
    ToastModule,
    DialogModule,
    RatingModule,
    InputTextareaModule,
    StepsModule,
    AccordionModule,
  ],
  providers: [OrderResolver, OrdersService, MessageService],
})
export class OrdersModule {}
