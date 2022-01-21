import { HttpCode } from '../../lib/constants'
import authService from '../../service/auth'
import {
  EmailService,
  SenderNodemailer,
  // SenderSendgrid,
} from '../../service/email'

const registration = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is already exist',
      })
    }
    const userData = await authService.create(req.body)
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderNodemailer(),
      // new SenderSendgrid(),
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
  } catch (error) {
    next(error)
  }
}
export default registration
