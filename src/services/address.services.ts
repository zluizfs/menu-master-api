import {
	AddressRepository,
	AddressServiceRequest,
	AddressServiceUpdateRequest,
} from "@menu-master-api/interfaces/address.interface"
import { AddressNotExistsError } from "./errors"

export class AddressService {
	constructor(private addressRepository: AddressRepository) {}

	async findById(addressId: number) {
		const address = await this.addressRepository.findById(addressId)

		if(!address){
			throw new AddressNotExistsError()
		}
		
		return address
	}

	async create({
		...data
	}: AddressServiceRequest) {
		const address = await this.addressRepository.create({
			...data,
		})

		return {
			address,
		}
	}

	async update(addressId: number, { modifiedAddress }: AddressServiceUpdateRequest) {
		const verifyAddressExists = await this.addressRepository.findById(addressId)

		if(!verifyAddressExists){
			throw new AddressNotExistsError()
		}

		const address = await this.addressRepository.update(addressId, {
			...modifiedAddress,
		})

		return {
			address,
		}
	}
}
