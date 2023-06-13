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
			return await this.prismaService.user.findUniqueOrThrow({
				where: {
					email,
					...(data?.password !== undefined && { password: data.password }),
					...(data?.username !== undefined && { username: data.username }),
					...(data?.firstName !== undefined && { firstName: data.firstName }),
					...(data?.lastName !== undefined && { lastName: data.lastName }),
					...(data?.picture !== undefined && { picture: data.picture }),
					...(data?.isVerified !== undefined && { isVerified: data.isVerified }),
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
