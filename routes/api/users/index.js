import { Router } from 'express'
import { aggregation, uploadAvatar } from '../../../controllers/users'
import guard from '../../../midllewares/validation/guard'
import Access from '../../../midllewares/validation/role-access'
import { Role } from '../../../lib/constants'
import { upload } from '../../../midllewares/validation/upload'
const router = new Router()

router.get('/stats/:id', guard, Access(Role.ADMIN), aggregation)

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)

export default router
