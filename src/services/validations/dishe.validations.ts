import { z } from "zod"

export const disheValidationBody = z.object({
	name: z.string().min(4).max(150),
	description: z.string().max(500),
	imageUrl: z.string().min(2).max(150),
	price: z.number().min(1),
	dishesCategoryId: z.number().min(1),
})
