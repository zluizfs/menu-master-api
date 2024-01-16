import { AddressUser } from "@prisma/client"
import { UserServiceRequest } from "./user.interface"
import { AddressServiceRequest } from "./address.interface"

export interface AddressUserRequestWithUserAndAddress extends UserServiceRequest, AddressServiceRequest {}

export interface AddressUserServiceRequest {
  userId: number;
  addressId: number;
}

export interface AddressUserRepository {
  create(data: AddressUserServiceRequest): Promise<AddressUser>
}
