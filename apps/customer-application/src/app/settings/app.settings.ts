import { environment } from '../../environments/environment';

export const PRODUCT_LOAD_LIMIT = 20;
export const SEARCH_DEBOUNCE_TIME = 1000;
export const DEVICE_TYPE = 'web';
export const DELIVERY_TYPE = 'standard';
export const SKELETON_LOADER_LIMIT = 16;
export const DEFAULT_FILTER_MIN_PRICE = 0;
export const DEFAULT_FILTER_MAX_PRICE = 500;
export const MAP_BOX_TOKEN = environment.MAP_BOX_TOKEN;
export const MAP_BOX_STYLES = 'mapbox://styles/mapbox/streets-v11';
export const MAP_BOX_ZOOM = 13;
export const ORDER_DEFAULT_DISTANCE = '2';
export const NOTIFICATIONS_LIMIT = 4;
export const REFUND_TYPE = {
    itemRefund: 'fullitemrefund',
    orderRefund: 'orderrefund'
}
