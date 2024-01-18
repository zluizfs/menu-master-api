import { FastifyInstance } from "fastify"

import { authentication } from "./authentication.controller"
import { register, registerWithAddress } from "./register.controller"

export async function userRoutes(app: FastifyInstance) {
	app.post("/users", register)
	app.post("/users/complete-registration", registerWithAddress)
	app.post("/auth", authentication)
}
