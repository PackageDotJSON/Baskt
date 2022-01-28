import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILambdaFunction } from '../../models/lambda-function.model';
import { HttpService } from '../http.service';
import { SocketService } from '@baskt-mono-repo/socket';
import { CART_EVENTS, AUTH_EVENTS } from '../../enums/socket-event-names.enum';
import { Product } from '../../models/Product';
import { ToastMessageService } from '../toast-message-service/toast-message.service';
import { LocalStorageService } from '@baskt-mono-repo/local-storage';
import { LOCAL_STORAGE_KEY } from '../../enums/local-storage-keys.enums';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private totalPrice: number;
  private phoneNumber: string;

  constructor(
    private http: HttpService,
    private socketService: SocketService,
    private messageService: ToastMessageService,
    private localStorage: LocalStorageService,
  ) {
    this.phoneNumber = this.localStorage.getData(LOCAL_STORAGE_KEY.PHONE);
  }

  getAvailableQuantity(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }

  async addToCart(payload) {
    this.socketService.sendMessage(CART_EVENTS.ADD_TO_CART, payload);
    try {
      const data = await this.socketService.receivedJustSingleValue(
        CART_EVENTS.RESPONSE_ADD_TO_CART,
      );
      if (data.status == 1) {
        this.totalPrice = 0;
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return error;
    }
  }

  removeFromCart(payload) {
    this.socketService.sendMessage(CART_EVENTS.REMOVE_FROM_CART, payload);
    this.socketService
      .receivedJustSingleValue(CART_EVENTS.RESPONSE_REMOVE_FROM_CART)
      .then((data) => {
        this.messageService.displayMessage('success', data.message);
      })
      .catch((err) => {
        this.messageService.displayMessage('error', err);
      });
  }

  getCartDetails(): Promise<Product[]> {
    this.socketService.sendMessage(
      AUTH_EVENTS.ON_DEVICE_CONNECT,
      this.phoneNumber,
    );
    return this.socketService.receivedJustSingleValue(
      CART_EVENTS.GET_CART_ITEMS,
    );
  }

  notifyMe(payload: ILambdaFunction): Observable<any> {
    return this.http.postHttpRequest(payload);
  }
}
