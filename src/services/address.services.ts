import {
	AddressRepository,
	AddressServiceRequest,
} from "@menu-master-api/interfaces/address.interface"

export class AddressService {
	constructor(private addressRepository: AddressRepository) {}

	async create({
		street,
		number,
		city,
		state,
		landmark,
		complement,
	}: AddressServiceRequest) {
		const address = await this.addressRepository.create({
			street,
			number,
			city,
			state,
			landmark,
			complement,
		})

		return {
			address
		}
	}
}
