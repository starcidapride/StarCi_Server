import { PrismaService } from '@database/prisma.service'
import { Injectable } from '@nestjs/common'
import { user } from '@prisma/client'

@Injectable()
export class UserDbService {
	constructor(private readonly prismaService: PrismaService) { }

	async getUser(
		email: string,
		data?: Partial<{
            password: string,
            username: string,
            firstName: string,
            lastName: string,
            picture: Buffer,
            isVerified: number
        }>
	): Promise<user | null> {
		try {

			return await this.prismaService.user.findFirstOrThrow({
				where: {
					email,
					...(data?.password && { password: data.password }),
					...(data?.username && { username: data.username }),
					...(data?.firstName && { firstName: data.firstName }),
					...(data?.lastName && { lastName: data.lastName }),
					...(data?.picture && { picture: data.picture }),
					...(data?.isVerified && { isVerified: data.isVerified }),
				}
			})
		} catch (ex) {
			return null
		}
	}

	async createUser(user: user): Promise<user | null> {
		try {
			return this.prismaService.user.create({
				data: user
			})
		}
		catch (ex) {
			return null
		}
	}

	async updateUser(
		email: string,
		data: Partial<{
            password: string
            username: string
            firstName: string
            lastName: string
            picture: Buffer
            isVerified: number
        }>
	): Promise<user | null> {
		try {
			return this.prismaService.user.update(
				{
					where: { email },
					data
				}
			)
		} catch (ex) {
			return null
		}
	}
}
