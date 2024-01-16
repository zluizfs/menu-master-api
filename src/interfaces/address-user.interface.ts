import { AddressUser } from "@prisma/client"
import { UserServiceRequest } from "./user.interface"
import { AddressServiceRequest } from "./address.interface"

export interface AddressUserRequestWithUserAndAddress extends UserServiceRequest, AddressServiceRequest {}

export interface AddressUserServiceRequest {
  userId: bigint;
  addressId: bigint;
}

export interface AddressUserRepository {
  create(data: AddressUserServiceRequest): Promise<AddressUser>
}
