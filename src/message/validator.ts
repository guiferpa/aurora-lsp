import { RequestMessage } from "./request";

export function isJSONRPC(message: RequestMessage): boolean {
  return message.jsonrpc === "2.0";
}

export function isNotification(message: RequestMessage): boolean {
  return message.id === undefined;
}
