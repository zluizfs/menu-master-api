import { DishesCategory, Prisma } from "@prisma/client"

export interface DisheCategoryServiceCreateRequest {
  description: string
}

export interface DisheCategoryRepository {
  create(data: DisheCategoryServiceCreateRequest): Promise<DishesCategory>
  findById(dishesCategoryId: number): Promise<DishesCategory | null>
  update(dishesCategoryId: number, data: Prisma.DishesCategoryUpdateInput): Promise<DishesCategory>
}
