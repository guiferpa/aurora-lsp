import pkg from "../../package.json";
import { MethodHandler } from "@/server/server";

const handler: MethodHandler = async (request) => {
  console.log(request);

  return {
    jsonrpc: "2.0",
    id: request.id,
    result: {
      capabilities: {
        colorProvider: true,
        completionProvider: {},
      },
      serverInfo: {
        name: pkg.name,
        version: pkg.version,
      },
    },
  };
};

export default handler;
