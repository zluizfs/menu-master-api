import { Address, Prisma } from "@prisma/client"

export interface AddressServiceRequest {
  street: string
  number: number
  city: string
  state: string
  landmark: string
  complement: string
}

export interface AddressServiceUpdateRequest  {
  addressId: number
  modifiedAddress: Prisma.AddressUpdateInput
}

export interface AddressRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  findById(addressId: number): Promise<Address | null>
  update(addressId: number, data: Prisma.AddressUpdateInput): Promise<Address>
}
