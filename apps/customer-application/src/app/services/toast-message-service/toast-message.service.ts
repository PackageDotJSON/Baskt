import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  displayMessage(
    severity = 'success' || 'error' || 'warning' || 'info',
    detail: string,
    summary?: string,
  ) {
    this.messageService.clear();
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 5000,
    });
  }
}
