import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"

export async function disheRoutes(app: FastifyInstance) {
	app.post("/dishe", { onRequest: [verifyJwt] }, create)
}
