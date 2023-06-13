import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class RefreshGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const authHeader = request.headers.authorization

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return false
		}
		return true
	}
}