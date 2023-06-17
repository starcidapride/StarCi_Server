import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { CreateDeckRequest } from '@defined-types/deck.type'

@Injectable()
export class CreateDeckGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | CreateDeckRequest = request.body

		if (this.isCreateDeckRequest(body))
		{
			return true
		}

		return false
	}

	private isCreateDeckRequest(body: unknown): body is CreateDeckRequest {
		const castedBody = body as CreateDeckRequest
		return (
			castedBody.deckName !== undefined
		)
	}
}