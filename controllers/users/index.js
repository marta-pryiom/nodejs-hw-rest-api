import { getStatistic } from '../../repository/statistic'
import { HttpCode } from '../../lib/constants'
import { NotFound } from '../../lib/messages'
import {
  UploadAvatarService,
  // LocalAvatarStorage,
  CloudAvatarStorage,
} from '../../service/avatar-storage'

const aggregation = async (req, res, next) => {
  const { id } = req.params
  const data = await getStatistic(id)
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data })
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: NotFound,
  })
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

export { aggregation, uploadAvatar }
