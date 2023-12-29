import net from "net";
import { parser } from "./message";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const reqs = parser.request(data);

    if (reqs.length > 0) {
      const [req] = reqs;

      console.log(req);

      if (req?.method === "initialize") {
        const message = {
          jsonrpc: "2.0",
          id: 0,
          result: {
            capabilities: {
              completionProvider: {},
            },
          },
        };
        socket.write(parser.response(message));
      }

      if (req?.method === "textDocument/completion") {
        const message = {
          jsonrpc: "2.0",
          id: 0,
          result: {
            items: [{ label: "public", kind: 1 }],
          },
        };
        socket.write(parser.response(message));
      }

      if (req?.method === "shutdown") {
        throw new Error("Connection with client's down");
      }
    }
  });

  socket.pipe(socket);
});

server.listen(1337, "0.0.0.0");
