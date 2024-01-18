import { z } from "zod"

export const addressValidationParams = z.object({ addressId: z.string() })

export const addressValidationBody = z.object({
	street: z.string().min(1),
	number: z.number(),
	city: z.string().min(2).max(150),
	state: z.string().min(2).max(2),
	landmark: z.string(),
	complement: z.string(),
})
