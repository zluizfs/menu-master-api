import { FastifyInstance } from "fastify";

import { create } from "./create.controller";
import { verifyJwt } from "@menu-master-api/http/middlewares";
import { get } from "./get.controller";

export async function disheRoutes(app: FastifyInstance) {
  app.post("/dish", { onRequest: [verifyJwt] }, create);
  app.get("/dish", { onRequest: [verifyJwt] }, get);
}
