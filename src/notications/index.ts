import Server from "@/server";

import didChangeConfiguration from "./did-change-configuration";
import initialized from "./initialized";

export function register(server: Server) {
  server.notifiier("workspace/didChangeConfiguration", didChangeConfiguration);
  server.notifiier("initialized", initialized);
}
