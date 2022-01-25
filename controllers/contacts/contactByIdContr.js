import { getContactById } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { NotFound } from '../../lib/messages'
// import { colors } from '../../helpers'
import { CustomError } from '../../lib/custom-error'

const contactByIdContr = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await getContactById(userId, id)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  throw new CustomError(HttpCode.NOT_FOUND,NotFound)
}
export default contactByIdContr
