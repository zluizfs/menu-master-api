import {
	UserRepository,
	UserServiceRequest,
} from "@menu-master-api/interfaces/user.interface"

import { hash } from "bcryptjs"
import { UserExistsError } from "./errors"

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async create({ name, password, email, phoneNumber }: UserServiceRequest) {
		const password_hash = await hash(password, 6)

		const verifyEmailExists = await this.userRepository.findByEmail(email)

		if (verifyEmailExists) {
			throw new UserExistsError()
		}

		const user = await this.userRepository.create({
			name,
			email,
			password: password_hash,
			phoneNumber,
		})

		return {
			user,
		}
	}
}
