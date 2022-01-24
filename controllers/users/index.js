import { getStatistic } from '../../repository/statistic'
import repositoryUsers from '../../repository/user'
import { HttpCode } from '../../lib/constants'
import { NotFound } from '../../lib/messages'
import {
  UploadAvatarService,
  // LocalAvatarStorage,
  CloudAvatarStorage,
} from '../../service/avatar-storage'
import {
  EmailService,
  // SenderNodemailer,
  SenderSendgrid,
} from '../../service/email'
import { CustomError } from '../../lib/custom-error'

const aggregation = async (req, res, next) => {
  const { id } = req.params
  const data = await getStatistic(id)
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data })
  }
  throw new CustomError (HttpCode.NOT_FOUND,NotFound)
}
const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadAvatarService(
    // LocalAvatarStorage,
    CloudAvatarStorage,
    req.file,
    req.user,
  )

  const avatarUrl = await uploadService.updateAvatar()

  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
}

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken) // додала await

  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Success' },
    })
  }
  res.status(HttpCode.BAD_REQUEST).json({
    status: 'success',
    code: HttpCode.BAD_REQUEST,
    data: { message: 'Invalide token' },
  })
}

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body
  const user = await repositoryUsers.findByEmail(email)
  if (user) {
    const { email, name, verifyTokenEmail } = user

    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid(),
      // new SenderNodemailer(),
    )
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyTokenEmail,
    )
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Success' },
      })
    }
    throw new CustomError(HttpCode.SE,'Unprocessable Entity')
  }
  throw new CustomError(HttpCode.NOT_FOUND,'NO user with this email is found')
}

export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser }
