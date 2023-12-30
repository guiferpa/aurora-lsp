import Server from "./server";
import * as controllers from "./controllers";

const server = new Server();

controllers.register(server);

server.notifiier("initialized", console.log);
server.notifiier("workspace/didChangeConfiguration", console.log);

server.listen(1337);
