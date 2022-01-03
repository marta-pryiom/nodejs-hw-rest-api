import { addContact } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
// import { colors } from '../../helpers'

const addNewContactContr = async (req, res, next) => {
  const { id: userId } = req.user
  const contact = await addContact(userId, req.body)
  res
    .status(HttpCode.CREATED)
    .json({ status: 'success', code: HttpCode.CREATED, data: { contact } })
  // .json({ status: 'success', code: HttpCode.CREATED, data: { contact } }.red)
}
export default addNewContactContr
