import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { SignUpRequest } from '@defined-types/auth.type'

@Injectable()
export class SignUpGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SignUpRequest = request.body

		if (this.isSignUpRequest(body)) {
			return true
		}
		
		return false
	}

	private isSignUpRequest(body: unknown): body is SignUpRequest {
		const castedBody = body as SignUpRequest
		return (
			castedBody.email !== undefined &&
			castedBody.password !== undefined &&
			castedBody.confirm !== undefined &&
			castedBody.username !== undefined &&
			castedBody.firstName !== undefined &&
			castedBody.lastName !== undefined
		)
	}
}