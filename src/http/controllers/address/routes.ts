import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"

export async function addressRoutes(app: FastifyInstance) {
	app.post("/address", {onRequest: [verifyJwt]}, create)
}
