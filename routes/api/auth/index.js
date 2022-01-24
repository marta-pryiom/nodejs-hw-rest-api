import { Router } from 'express'
import { registration, login, logout } from '../../../controllers'
import quard from '../../../midllewares/validation/guard'
import limiter from '../../../midllewares/validation/rate-limit'
import wrapperError from '../../../midllewares/validation/error-handler'

const router = new Router()
router.post('/registration', limiter(15 * 60 * 1000, 2), wrapperError(registration))
router.post('/login', wrapperError(login))
router.post('/logout', quard, wrapperError(logout))
export default router
