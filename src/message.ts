const KEY_O_BRACKET = 123;
const KEY_C_BRACKET = 125;

export const parser = {
  request(buffer: Buffer): any[] {
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

    return result.map((item) => JSON.parse(item));
  },
  response(data: any): Buffer {
    const content = Buffer.from(JSON.stringify(data), "utf-8");
    const message = `Content-Length: ${
      content.byteLength
    }\r\n\r\n${content.toString("ascii")}`;
    return Buffer.from(message, "utf-8");
  },
};
