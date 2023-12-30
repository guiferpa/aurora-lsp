import net from "net";

import { NotificationMessage } from "@/message/notification";
import { RequestMessage } from "@/message/request";
import { ResponseMessage } from "@/message/response";
import * as parser from "@/message/parser";
import * as validator from "@/message/validator";

export const DEFAULT_HOST = "127.0.0.1";

export type HandlerResponse = ResponseMessage | null;

export type MethodHandler = (
  message: RequestMessage
) => Promise<HandlerResponse>;

export type NotificiationHandler = (message: NotificationMessage) => void;

export default class Server {
  private _notifier: Map<string, NotificiationHandler> = new Map([]);
  private readonly _routes: Map<string, MethodHandler> = new Map([]);

  constructor(private readonly _enableDebug: boolean = false) {}

  public notifiier(name: string, handler: NotificiationHandler) {
    this._notifier.set(name, handler);
  }

  public register(method: string, handler: MethodHandler) {
    this._routes.set(method, handler);
  }

  private processNotification(request: RequestMessage): void {
    const handler = this._notifier.get(request.method);
    if (typeof handler === "undefined") {
      this._enableDebug &&
        console.log(
          `===== Notification handler NOT FOUND =====\r\n${JSON.stringify(
            request
          )}\r\n=====`
        );
      return;
    }

    handler(request);
  }

  private async processMethod(
    request: RequestMessage
  ): Promise<HandlerResponse> {
    const handler = this._routes.get(request.method);
    if (typeof handler === "undefined") {
      this._enableDebug &&
        console.log(
          `===== Method handler NOT FOUND =====\r\n${JSON.stringify(
            request
          )}\r\n=====`
        );
      return null;
    }

    return handler(request);
  }

  public listen(port: number, host: string = DEFAULT_HOST) {
    const server = net.createServer((socket) => {
      socket.on("data", async (data) => {
        const requests = parser.request(data);

        const responses = requests.flatMap(
          async (request): Promise<HandlerResponse> => {
            if (validator.isNotification(request)) {
              this.processNotification(request);
              return null;
            }

            return this.processMethod(request);
          }
        );

        (await Promise.all(responses))
          .filter((result) => result !== null)
          .forEach((result) => {
            socket.write(parser.response(result as ResponseMessage));
          });
      });

      socket.pipe(socket);
    });

    server.listen(port, host);
  }
}
