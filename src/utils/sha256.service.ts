import cryptoConfig from '@config/crypto.config'
import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'


@Injectable()
export class CryptoService {
	createHashSHA256(message: string): string {
		return createHash('sha256').update(cryptoConfig().salt + message).digest('hex')
	}

	verifyHashSHA256(message: string, hash: string): boolean {
		const calculatedHash = this.createHashSHA256(message)
		return (calculatedHash === hash)
	}
}