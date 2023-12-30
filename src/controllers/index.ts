import Server from "@/server";

import initialize from "./initialize";
import completion from "./completion";
import shutdown from "./shutdown";

export function register(server: Server) {
  server.register("initialize", initialize);
  server.register("textDocument/completion", completion);
  server.register("shutdown", shutdown);
}
