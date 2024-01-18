import { DishesCategory, Prisma } from "@prisma/client";

export interface DishCategoryServiceCreateRequest {
  description: string;
}

export interface DishCategoryRepository {
  create(data: DishCategoryServiceCreateRequest): Promise<DishesCategory>;
  findById(dishesCategoryId: number): Promise<DishesCategory | null>;
  update(
    dishesCategoryId: number,
    data: Prisma.DishesCategoryUpdateInput
  ): Promise<DishesCategory>;
}
