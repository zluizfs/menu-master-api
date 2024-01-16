import { FastifyInstance } from "fastify"

import { create } from "./create.controller"
import { verifyJwt } from "@menu-master-api/http/middlewares"
import { update } from "./update.controller"
import { findById } from "./search.controller"

export async function addressRoutes(app: FastifyInstance) {
	app.post("/address", { onRequest: [verifyJwt] }, create)
	app.put("/address/:addressId", { onRequest: [verifyJwt] }, update)
	app.get("/address/:addressId", { onRequest: [verifyJwt] }, findById)
}
