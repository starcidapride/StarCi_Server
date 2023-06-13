import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UploadImageRequest } from '@defined-types/profile.type'

@Injectable()
export class UploadImageGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | UploadImageRequest = request.body
		
		if (this.isUploadImageRequest(body)) {
			return true
		}
		return false
	}

	private isUploadImageRequest(body: unknown): body is UploadImageRequest {
		const castedBody = body as UploadImageRequest
		return (
			castedBody.picture !== undefined 
		)
	}
}