import jwtConfig from '@config/jwt.config'
import mailerConfig from '@config/mailer.config'
import serverConfig from '@config/server.config'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { createTransport } from 'nodemailer'

@Injectable()
export class MailerService {
	constructor(
		private readonly jwtService: JwtService
	){}
		
	private generateVerifyToken(email: string): string {
		const payload = { email }
		const token = this.jwtService.sign(payload, {
			expiresIn: jwtConfig().verifyTokenExpiryTime,
			secret: jwtConfig().secret,
		})
		return token
	}

	private transporter = createTransport({
		service: 'gmail',
		auth: {
			user: mailerConfig().mailerUser,
			pass: mailerConfig().mailerPass
		} 
	})

	private mailOptions = (email: string, username: string) => { 
		const serverURL = serverConfig().serverUrl
		const token = this.generateVerifyToken(email)
		return {
			from: 'starcidapride@gmail.com',
			to: email,
			subject: 'XÁC NHẬN ĐĂNG KÝ - STARCI',
			html: `
            <p>Chào ${username},</p>
            <p>Để hoàn tất đăng ký, làm ơn hãy nhấn vào link xác nhận dưới đây:</p>
            <a href="${serverURL}auth/verify-email?email=${email}&token=${token}">Đây</a>
            <p>Nếu bạn đã không đăng ký vào StarCi, thì có thể bỏ qua email này.</p>
            <p>Thân ái,</p>
            <p>Tu Cuong </p> 
			<p>Nhà sáng lập StarCi</p>`
		} 
	}

	async sendMail(email: string, username: string){
		this.transporter.sendMail(this.mailOptions(email, username))
	}
}