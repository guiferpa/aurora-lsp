import { RequestMessage } from "./request";
import { ResponseMessage } from "./response";
import { isJSONRPC } from "./validator";

const KEY_O_BRACKET = 123;
const KEY_C_BRACKET = 125;

export function request(buffer: Buffer): RequestMessage[] {
  let counter = -1;
  let start = 0;

  const result: string[] = [];

  for (const [i, b] of buffer.entries()) {
    if (b === KEY_O_BRACKET) {
      if (counter === -1) {
        start = i;
        counter = 0;
      }
      counter += 1;
    }

    if (b === KEY_C_BRACKET) {
      counter -= 1;
    }

    if (counter === 0) {
      result.push(buffer.subarray(start, i + 1).toString("ascii"));
      counter = -1;
    }
  }

  return result
    .map((item) => JSON.parse(item))
    .filter((item) => isJSONRPC(item));
}

export function response(message: ResponseMessage): Buffer {
  const content = Buffer.from(JSON.stringify(message), "utf-8");
  const str = content.toString("ascii");
  const data = `Content-Length: ${content.byteLength}\r\n\r\n${str}`;
  return Buffer.from(data, "utf-8");
}
