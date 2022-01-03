import { Router } from 'express'
import { registration, login, logout } from '../../../controllers'
import quard from '../../../midllewares/validation/guard'
import limiter from '../../../midllewares/validation/rate-limit'

const router = new Router()
router.post('/registration', limiter(15 * 60 * 1000, 2), registration)
router.post('/login', login)
router.post('/logout', quard, logout)
export default router
