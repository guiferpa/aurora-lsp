import { Message } from "./message";

export type ResponseMessageId = number | string | null;

export type ResponseMessageResult =
  | string
  | number
  | boolean
  | object[]
  | object
  | null;

export interface ResponseMessage extends Message {
  id: ResponseMessageId;
  result?: ResponseMessageResult;
  error?: ResponseError;
}

export type ResponseErrorCode = number;

export type ResponseErrorData = string | number | boolean | object[] | null;

export interface ResponseError {
  code: ResponseErrorCode;
  message: string;
  data?: ResponseErrorData;
}
