//LIST OF APIs
export const enum PRODUCTS_FUNCTIONS_NAMES {
  // HOME PAGE
  APP_RAND_20 = 'app-rand20',
  APP_SEARCH_PRODUCT = 'app-searchProduct',
  APP_GET_PRODUCT_CATEGORY = 'app-getProductCategory',
  APP_GET_ALL_BRANDS = 'app-getAllBrands',
  APP_GET_CUSTOMER_FAVOURITE_PRODUCTS = 'app-getCustomerFavProducts',
  APP_ADD_TO_FAVOURITE = 'app-addToFavorite',
  APP_REMOVE_FROM_FAVOURITE = 'app-removeFromFavorite',
  APP_GET_AVAILABLE_QUANTITY = 'app-getAvailableQuantity',
  APP_OUT_OF_STOCK_NOTIFY_ME = 'app-outOfStockNotifyMe',
}

export const enum AUTH_FUNCTIONS_NAMES {
  // REGISTRATION AND LOGIN
  APP_VERIFY_ZIP_CODE = 'app-verifyZipCode',
  APP_INSTALL = 'app-installation',
  APP_GET_STORE_AND_ZIP_BY_PHONE = 'app-getStoreAndZipByPhone',
  APP_SUBSCRIBE_EMAIL = 'app-subscribeEmail',
  APP_LOG_OUT = 'app-logout',
}

export const enum CART_FUNCTION_NAMES {
  // CART ITEMS
  APP_GET_CUSTOMER_BASKT_BUCKS = 'app-getCustomerBasktBucks',
  ADMIN_CLEAR_CART = 'admin-clearCart',
  APP_CHECK_DELIVERY_AMOUNT = 'app-checkDeliveryAmount',
  APP_GET_CUSTOMER_LOCATIONS = 'app-getCustomerLocations',
  APP_VERIFY_LOCAL_PRODUCTS = 'app-verifyLocalProducts',
  APP_GET_DELIVERY_TIME_LIMIT = 'app-getDeliveryTimeLimit',
  APP_ADD_CUSTOMER_LOCATION = 'app-addCustomerLocation',
}

export const enum ORDERS_FUNCTION_NAMES {
  // ORDER ITEMS
  APP_GET_CUSTOMER_ORDER = 'app-getOrders',
  APP_PLACE_ORDER = 'app-placeOrder',
  APP_GET_ITEMS_BY_ORDER_ID = 'app-getItemsByOrderId',
  STOCKING_REFUND_ITEM = 'stocking-refundItem',
  APP_RATE_ORDER = 'app-rateOrder',
  APP_TRACK_ORDER = 'app-trackOrder',
}

export const enum SETTINGS_FUNCTION_NAMES {
  // PROFILE SETTINGS
  APP_GET_CUSTOMER_DETAILS_BY_PHONE = 'app-getCustomerDetailsByPhone',
  APP_UPDATE_CUSTOMER_DETAILS = 'app-updateCustomerDetails',
  APP_GET_CUSTOMER_PRODUCT_SELECTION_SETTING = 'app-getCustomerProductSelectionSetting',
  APP_UPDATE_CUSTOMER_PRODUCT_SELECTION_SETTING = 'app-updateCustomerProductSelectionSetting',
}

export const enum COUPON_FUNCTION_NAMES {
  // GET COUPON
  APP_VALIDATE_COUPON = 'app-validateCoupon',
}

export const enum GIFT_FUNCTION_NAMES {
  //GET CARD
  APP_GET_CUSTOMER_SCRATCH_CARD = 'app-getCustomerScratchCards',
  APP_GET_REFERRAL_URL = 'app-getReferralUrl',
  APP_VALIDATE_GIFT = 'app-validateGift',
}

export const enum STATIC_FUNCTION_NAMES {
  APP_GET_CUSTOMER_FEEDBACK = 'app-getCustomerFeedBack',
}

export const enum CAREER_FUNCTION_NAMES {
  APP_UPLOAD_JOB_APP_ASSETS = 'app-uploadJobApplicationAssets',
}

export const enum NOTIFICATIONS_FUNCTION_NAMES {
  APP_GET_CUSTOMER_NOTIFICATIONS = 'app-getCustomerNotifications',
}
