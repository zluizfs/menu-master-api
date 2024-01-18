import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"

export async function orderRoutes(app: FastifyInstance) {
	app.post("/order", { onRequest: [verifyJwt] }, create)
}
