import { User } from '@decorators/user.decorator'
import { Controller, Put, Body, UseGuards } from '@nestjs/common'
import { user } from '@prisma/client'
import { ProfileService } from './profile.service'
import { JwtAuthGuard } from '@http/auth/guards/jwt.guard'
import { UploadImageGuard } from './guards/upload-image.guard'
import { PresentableUser } from '@defined-types/auth.type'


@Controller('api/profile')
export class ProfileController {
	constructor(
        private readonly profileService: ProfileService,
	) { }

	@UseGuards(JwtAuthGuard, UploadImageGuard)
    @Put('upload-picture')
	async handleUploadPicture(@User() user: user, @Body() body : {picture: string}): Promise<PresentableUser>{
		const {picture} = body
		return this.profileService.performUploadPicture(user.email, picture)
	}
}
