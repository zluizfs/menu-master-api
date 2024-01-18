import { UserServiceResponseWithAddress } from "./user.interface"

export interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export interface AuthenticateServiceResponse  {
  user: UserServiceResponseWithAddress
}