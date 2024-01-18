import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
	await prisma.user.deleteMany()

	await prisma.user.create({
		data: {
			name: "Fred",
			email: "fred@graodireto.com",
			password: "$2a$06$sXlsXarPhvL7k1rI0jLZ0.04Kq5ilEEd.zWpftt7jSycdV1W8Fnuy",
			phoneNumber: "34987654321",
			addresses: {
				create: {
					address: {
						create: {
							street: "Rua A",
							city: "Patos de Minas",
							state: "MG",
							landmark: "",
							neighborhood: "JK",
							number: 490,
							complement: "Casa",
						},
					},
				},
			},
		},
	})

	await prisma.restaurant.create({
		data: {
			name: "Pizzaria Borda Recheada",
			description: "Diversas variações de pizza. A melhor pizzaria da região.",
			phoneNumber: "34987654321",
			imageUrl:
        "https://assets.architecturaldigest.in/photos/64f85037ec0bc118bdd98aba/16:9/w_1920,c_limit/Untitled%20design%20(14).png",
			rating: 4.8,
			address: {
				create: {
					street: "Rua Major Gote",
					city: "Patos de Minas",
					state: "MG",
					landmark: "",
					neighborhood: "Caiçaras",
					number: 31,
					complement: "Comércio",
				}
			},
			dishes: {
				create: {
					name: "Pizza de Calabresa",
					description: "Pizza de Calabresa com milho, calabresa, bacon e borda recheada de catupiry",
					imageUrl: "https://www.receiteria.com.br/wp-content/uploads/pizza-de-calabresa-facil-08.jpeg",
					price: 50,
					dishesCategory: {
						create: {
							description: "Pizza"
						}
					}
				}
			}
			
		},
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
