import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { SearchCardsRequest } from '@defined-types/card.type'

@Injectable()
export class SearchCardsGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SearchCardsRequest = request.body

		if (this.isSearchCardsRequest(body) && 
        !( body.type < 0 || body.type > 4) && 
        !( body.equipmentClass < 0 || body.equipmentClass > 6) &&
        !( body.equipmentClass < 0 || body.equipmentClass > 3))
		{
			return true
		}

		return false
	}

	private isSearchCardsRequest(body: unknown): body is SearchCardsRequest {
		const castedBody = body as SearchCardsRequest
		return (
			castedBody.name !== undefined &&
			castedBody.type !== undefined && typeof castedBody.type === 'number' &&
			castedBody.championRole !== undefined &&  typeof castedBody.championRole === 'number' &&
			castedBody.equipmentClass !== undefined &&  typeof castedBody.equipmentClass === 'number'
		)
	}
}