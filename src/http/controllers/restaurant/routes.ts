import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"
import { findAll, findById } from "./get.controller"

export async function restaurantRoutes(app: FastifyInstance) {
	app.post("/restaurant", { onRequest: [verifyJwt] }, create)
	app.get("/restaurant", { onRequest: [verifyJwt] }, findAll)
	app.get("/restaurant/:restaurantId", { onRequest: [verifyJwt] }, findById)
}
