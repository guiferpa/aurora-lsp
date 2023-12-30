import { MethodHandler } from "@/server/server";

const handler: MethodHandler = async (request) => {
  throw new Error("Connection with client's down");
};

export default handler;
