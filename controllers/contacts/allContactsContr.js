import { listContacts } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
// import { colors } from '../../helpers'

const allContactsContr = async (req, res, next) => {
  const { id: userId } = req.user
  console.log(req.query)
  const allContacts = await listContacts(userId, req.query)
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { allContacts } })
  // .json({ status: 'success', code: HttpCode.OK, data: { allContacts } }.red)
}

export default allContactsContr
