import { Message } from "./message";

export interface RequestMessage extends Message {
  id: number | string;
  method: string;
  params?: object[] | object;
}
