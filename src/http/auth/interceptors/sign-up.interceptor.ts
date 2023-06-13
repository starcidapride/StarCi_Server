import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class SignUpInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		console.log('Before request processing')
		const data = context.switchToHttp().getRequest().body
		const { email, password, confirm, username, firstName, lastName } = data
		const errors: string[] = []
        
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
		if (!email.match(emailRegex)) {
			errors.push('Email không đúng định dạng (abc@xyz.gh).')
		}

		const passwordLengthRegex = /^.{6,20}$/
		const passwordSpecialCharRegex = /^(?=.*?[A-Z])(?=.*?[!@#$%^&*()_+~`|}{\\[\]\\:;“’<,>.?/]).*$/

		if (!(password.match(passwordLengthRegex) || password.match(passwordSpecialCharRegex))) {
			errors.push('Mật khẩu cần tối thiểu 6 kí tự và tối đa 20 kí tự, cần ít nhất một chữ hoa và một kí tự đặc biệt.')
		}

		else if (!password.match(passwordLengthRegex)) {
			errors.push('Mật khẩu cần tối thiểu 6 kí tự và tối đa 20 kí tự.')
		}

		else if (!password.match(passwordSpecialCharRegex)) {
			errors.push('Mật khẩu cần ít nhất một chữ hoa và một kí tự đặc biệt.')
		}

		else if (confirm != password) {
			errors.push('Mật khẩu và xác nhận không trùng nhau.')
		}

		const usernameLengthRegex = /^.{6,20}$/
		if (!(username.match(usernameLengthRegex))) {
			errors.push('Tên người dùng cần tối thiểu 6 kí tự và tối đa 20 kí tự.')
		}

		const nameRegex = /^.{2,50}$/
		if (!firstName.match(nameRegex)) {
			errors.push('Tên cần tối thiểu 2 kí tự và tối đa 20 kí tự.')
		}

		if (!lastName.match(nameRegex)) {
			errors.push('Họ cần tối thiểu 2 kí tự và tối đa 20 kí tự.')
		}

		if (errors.length) {
			let errorMessage = 'Có vài lỗi xác thực xảy ra: \n'
			errors.forEach(error => errorMessage += ' ● ' + error + '\n')
			throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST)
		}

		return next.handle()
	}
}