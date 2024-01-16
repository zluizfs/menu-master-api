import { UserRepository } from "@menu-master-api/interfaces"
import {
	AddressUserRepository,
	AddressUserRequestWithUserAndAddress,
	AddressUserServiceRequest,
} from "@menu-master-api/interfaces/address-user.interface"
import { AddressRepository } from "@menu-master-api/interfaces/address.interface"
import { UserService } from "./user.services"
import { AddressService } from "./address.services"
import { prisma } from "@menu-master-api/lib/prisma"

export class AddressUserUserService {
	constructor(
    private userRepository: UserRepository,
    private addressRepository: AddressRepository,
    private addressUserRepository: AddressUserRepository
	) {}
	async create({ userId, addressId }: AddressUserServiceRequest) {
		const addressUser = await this.addressUserRepository.create({
			userId: userId,
			addressId: addressId,
		})

		return addressUser
	}
	async createUserAndAddress({
		...data
	}: AddressUserRequestWithUserAndAddress) {
		const userService = new UserService(this.userRepository)
		const addressService = new AddressService(this.addressRepository)

		const transation = await prisma.$transaction(async () => {
			const { user } = await userService.create({
				email: data.email,
				name: data.name,
				password: data.password,
				phoneNumber: data.phoneNumber,
			})

			const { address } = await addressService.create({
				street: data.street,
				number: data.number,
				city: data.city,
				state: data.state,
				complement: data.complement,
				landmark: data.landmark,
			})

			const addressUser = await this.addressUserRepository.create({
				userId: user.userId,
				addressId: address.addressId,
			})

			return {
				user,
				address,
				addressUser,
			}
		})

		return {
			transation,
		}
	}
}
