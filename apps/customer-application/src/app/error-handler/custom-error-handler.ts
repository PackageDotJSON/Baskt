import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('Error', {
      name: error.name,
      message: error.message,
      stack: error.stack || '',
    });
  }
}
