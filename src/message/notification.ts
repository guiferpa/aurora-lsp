import { Message } from "./message";

export interface NotificationMessage extends Message {
  method: string;
  params?: object[] | object;
}
