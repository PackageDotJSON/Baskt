export interface IOrder {
  addressLocation: string;
  alreadyRated: boolean;
  boxesTrackStatus: string[];
  customerLocationId: string;
  deliveryTimeFrom: string;
  deliveryTimeTo: string;
  deliveryType: string;
  driverName: string;
  driverPhone: string;
  noOfItems: number;
  noOfUnfullfilledItems: number;
  oc_status: number;
  orderDate: string;
  orderFeedback: string;
  orderId: string;
  orderRating: number;
  orderedSince: string;
  phone: string;
  pickupMaxTime: string;
  pickupMinTime: string;
  salesTax: number;
  status: string;
  statusColor: string;
  title: string;
  totalAmount: number;
}

export class Order implements IOrder {
  constructor(
    public addressLocation: string,
    public alreadyRated: boolean,
    public boxesTrackStatus: string[],
    public customerLocationId: string,
    public deliveryTimeFrom: string,
    public deliveryTimeTo: string,
    public deliveryType: string,
    public driverName: string,
    public driverPhone: string,
    public noOfItems: number,
    public noOfUnfullfilledItems: number,
    public oc_status: number,
    public orderDate: string,
    public orderFeedback: string,
    public orderId: string,
    public orderRating: number,
    public orderedSince: string,
    public phone: string,
    public pickupMaxTime: string,
    public pickupMinTime: string,
    public salesTax: number,
    public status: string,
    public statusColor: string,
    public title: string,
    public totalAmount: number,
  ) {}
}
