export class RestarantOpeningHoursNotExistsError extends Error {
	constructor() {
		super("Horário de funcionamneto do restaurante não encontrado!")
	}
}
