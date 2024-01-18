import { Prisma, User } from "@prisma/client"

export interface UserServiceRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserServiceResponseWithAddress {
  userId: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  addresses: {
    userId: number;
    addressId: number;
    address: {
      addressId: number;
      street: string;
      number: number;
      city: string;
      state: string;
      landmark: string;
      complement: string;
    };
  }[];
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserServiceResponseWithAddress | null>;
  findById(userId: number): Promise<UserServiceResponseWithAddress | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
