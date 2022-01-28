import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';

import { SettingsComponent } from './settings.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProductControlComponent } from './product-control/product-control.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

import { SettingsService } from './service/settings.service';
import { MessageService } from 'primeng/api';
import { SettingsResolver } from './service/resolver/settings.resolver';

const ROUTES: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    resolve: {
      settings: SettingsResolver,
    },
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    AccountSettingsComponent,
    ProductControlComponent,
    SettingsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
    TooltipModule,
  ],
  providers: [SettingsService, SettingsResolver, MessageService],
})
export class SettingsModule {}
