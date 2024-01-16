import { Address, AddressUser, Prisma, User } from "@prisma/client"

export interface UserServiceRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserServiceResponseWithAddress {
  user: User;
  address: Address;
  addressUser: AddressUser
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
