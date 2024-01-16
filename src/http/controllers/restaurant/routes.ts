import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"


export async function restaurantRoutes(app: FastifyInstance) {
	app.post("/restaurant", { onRequest: [verifyJwt] }, create)
}
