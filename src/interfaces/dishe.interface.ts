import { Dishe, Prisma } from "@prisma/client"

export interface DisheCreateServiceRequest {
  name: string
  description: string
  price: number
  imageUrl: string
  dishesCategoryId: number
}


export interface DisheServiceUpdateRequest  {
  modifiedDishe: Prisma.DisheUpdateInput
}

export interface DisheRepository {
  create(data: DisheCreateServiceRequest): Promise<Dishe>
  findById(dishesId: number): Promise<Dishe | null>
  update(dishesId: number, data: Prisma.DisheUpdateInput): Promise<Dishe>
}
