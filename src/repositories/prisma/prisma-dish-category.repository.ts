import {
  DishCategoryRepository,
  DishCategoryServiceCreateRequest,
} from "@menu-master-api/interfaces";
import { prisma } from "@menu-master-api/lib/prisma";

import { Prisma } from "@prisma/client";

export class PrismaDishCategoryRepository implements DishCategoryRepository {
  async create(data: DishCategoryServiceCreateRequest) {
    const dishesCategory = await prisma.dishesCategory.create({
      data,
    });

    return dishesCategory;
  }

  async findById(dishesCategoryId: number) {
    const dishesCategory = await prisma.dishesCategory.findUnique({
      where: {
        dishesCategoryId,
      },
    });

    return dishesCategory;
  }

  async update(
    dishesCategoryId: number,
    data: Prisma.DishesCategoryUpdateInput
  ) {
    const dishesCategory = await prisma.dishesCategory.update({
      data,
      where: {
        dishesCategoryId,
      },
    });

    return dishesCategory;
  }
}
