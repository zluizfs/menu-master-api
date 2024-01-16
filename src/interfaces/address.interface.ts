import { Address, Prisma } from "@prisma/client"

export interface AddressServiceRequest {
  street: string
  number: number
  city: string
  state: string
  landmark: string
  complement: string
}

export interface AddressRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
}
