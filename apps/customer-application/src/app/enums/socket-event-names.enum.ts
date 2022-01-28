export const enum AUTH_EVENTS {
  VERIFY_PHONE = 'verifyPhone',
  VERIFY_PHONE_RESPONSE = 'verifyPhoneResponse',
  VERIFY_OTP = 'verifyOtp',
  VERIFY_OTP_RESPONSE = 'verifyOtpResponse',
  REGISTRATION_EVENT = 'register',
  ON_DEVICE_CONNECT = 'onDeviceConnect',
}

export const enum CART_EVENTS {
  GET_CART_ITEMS = 'cartItems',
  ADD_TO_CART = 'addToCart',
  RESPONSE_ADD_TO_CART = 'responseAddToCart',
  REMOVE_FROM_CART = 'removeFromCart',
  RESPONSE_REMOVE_FROM_CART = 'responseRemoveFromCart',
}
