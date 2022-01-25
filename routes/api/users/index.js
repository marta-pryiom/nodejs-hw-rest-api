import { Router } from 'express'
import {
  aggregation,
  repeatEmailForVerifyUser,
  uploadAvatar,
  verifyUser,
} from '../../../controllers/users'
import guard from '../../../midllewares/validation/guard'
import Access from '../../../midllewares/validation/role-access'
import { Role } from '../../../lib/constants'
import { upload } from '../../../midllewares/validation/upload'
import wrappedError from '../../../midllewares/validation/error-handler'

const router = new Router()

router.get('/stats/:id', guard, Access(Role.ADMIN), wrappedError(aggregation))

router.patch('/avatar', guard, upload.single('avatar'),wrappedError( uploadAvatar))

router.get('/verify/:token', wrappedError(verifyUser))

router.post('/verify', wrappedError(repeatEmailForVerifyUser))
export default router
