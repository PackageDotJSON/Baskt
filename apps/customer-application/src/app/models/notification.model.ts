export interface NotificationModel {
  date_sent: string;
  date_time: number;
  notification_data: {
    message: string,
    title: string
  };
  notification_id: string;
  order_id: string;
  seen: boolean;
}
