import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireBaseService } from './firebase.service';
import { TokenService } from './token.service';

@NgModule({
  imports: [CommonModule],
  providers: [FireBaseService, TokenService],
})
export class FirebaseModule {}
