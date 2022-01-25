import { HttpCode } from '../../lib/constants'
import authService from '../../service/auth'
import {
  EmailService,
  // SenderNodemailer,
  SenderSendgrid,
} from '../../service/email'
import { CustomError } from '../../lib/custom-error'

const registration = async (req, res, next) => {
  
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
      throw new CustomError (HttpCode.CONFLICT,'Email is already exist')
    }
    const userData = await authService.create(req.body)
    const emailService = new EmailService(
      process.env.NODE_ENV,
      // new SenderNodemailer(),
      new SenderSendgrid(),
    )
    const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verifyTokenEmail,
    )
    delete userData.verifyTokenEmail

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { ...userData, isSendEmailVerify: isSend },
    })
  
}
export default registration
