import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { refresh_token } from '@prisma/client'

@Injectable()
export class RefreshTokenDbService {
	constructor(private prisma: PrismaService) {
	}
	async getToken(token: string): Promise<refresh_token | null> {
		try{
			return await this.prisma.refresh_token.findUniqueOrThrow({
				where: { token }
			})
		} catch (ex){
			return null
		}
		
	}

	async deleteToken(token: string): Promise<refresh_token | null> {
		try {
			return await this.prisma.refresh_token.delete({ where: { token } })
		} catch (ex) {
			return null
		}

	}

	async addToken(refreshToken: refresh_token): Promise<refresh_token| null> {

		try {
			return await this.prisma.refresh_token.create({ data: refreshToken})
		} catch (ex) {
			return null
		}
	}
}