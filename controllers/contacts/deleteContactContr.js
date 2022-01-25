import { removeContact } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { Deleted, NotFound } from '../../lib/messages'
// import { colors } from '../../helpers'
import { CustomError } from '../../lib/custom-error'

const deleteContactContr = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await removeContact(userId, id)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, message: Deleted })
    // .json({ status: 'success', code: HttpCode.OK, message: Deleted }.yellow)
  }
  throw new CustomError(HttpCode.NOT_FOUND,NotFound)
}
export default deleteContactContr
