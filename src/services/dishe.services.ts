import {
	DisheNotExistsError,
} from "./errors"
import {
	DisheCreateServiceRequest,
	DisheRepository,
	DisheServiceUpdateRequest,
} from "@menu-master-api/interfaces"

export class DisheService {
	constructor(private disheRepository: DisheRepository) {}

	async findById(dishesId: number) {
		const dishe = await this.disheRepository.findById(dishesId)

		if (!dishe) {
			throw new DisheNotExistsError()
		}

		return dishe
	}

	async create({
		...data
	}: DisheCreateServiceRequest) {
		const dishe = await this.disheRepository.create({
			...data,
		})

		return {
			dishe,
		}
	}

	async update(
		disheId: number,
		{ modifiedDishe }: DisheServiceUpdateRequest
	) {
		const verifyDisheExists = await this.disheRepository.findById(
			disheId
		)

		if (!verifyDisheExists) {
			throw new DisheNotExistsError()
		}

		const dishe = await this.disheRepository.update(disheId, {
			...modifiedDishe,
		})

		return {
			dishe,
		}
	}
}
