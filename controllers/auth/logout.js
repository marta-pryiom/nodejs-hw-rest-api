import { HttpCode } from '../../lib/constants'
import authService from '../../service/auth'

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.OK, data: {} })
}
export default logout
