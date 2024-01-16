import {
	AuthenticateServiceRequest,
	AuthenticateServiceResponse,
	UserRepository,
} from "@menu-master-api/interfaces"
import { InvalidCredentialsError } from "./errors"
import { compare } from "bcryptjs"

export class AuthenticationService {
	constructor(private usersRepository: UserRepository) {}

	async auth({
		email,
		password,
	}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const isPasswordMatch = await compare(password, user.password)

		if (!isPasswordMatch) {
			throw new InvalidCredentialsError()
		}

		return {
			user
		}

	}
}
