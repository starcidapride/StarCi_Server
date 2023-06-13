import { Module } from '@nestjs/common'
import { ProfileController } from '@http/profile/profile.controller'
import { PrismaService } from '@database/prisma.service'
import { UserDbService } from '@database/user.db.service'
import { ProfileService } from './profile.service'

@Module({
	imports: [],
	providers: [
		PrismaService,
		UserDbService,
		ProfileService
	],
	controllers: [ProfileController]
})
export class ProfileModule {}
