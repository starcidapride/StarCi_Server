import { UserDbService } from '@database/user.db.service'
import { PresentableUser } from '@defined-types/auth.type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProfileService {
	constructor(private readonly userDbService: UserDbService){}
	async performUploadPicture(email: string, picture: string): Promise<PresentableUser>{
		
		const user = await this.userDbService.updateUser(email, {picture: Buffer.from(picture)})
		const presentableUser: PresentableUser = {
			email: user.email,
			picture: user.picture?.toString('base64') ?? undefined,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName
		}
		return presentableUser
	}
}