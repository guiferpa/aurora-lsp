import Server from "./server";
import * as controllers from "./controllers";
import * as notifications from "./notications";

const server = new Server();

export default async function run() {
  controllers.register(server);
  notifications.register(server);

  server.listen(1337);
}
