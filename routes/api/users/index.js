import { Router } from 'express'
import aggregation from '../../../controllers/users'
import quard from '../../../midllewares/validation/guard'
import Access from '../../../midllewares/validation/role-access'
import { Role } from '../../../lib/constants'
const router = new Router()
router.get('/stats/:id', quard, Access(Role.ADMIN), aggregation)

export default router
