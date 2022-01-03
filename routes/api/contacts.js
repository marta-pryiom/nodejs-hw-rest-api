import {
  allContactsContr,
  contactByIdContr,
  addNewContactContr,
  deleteContactContr,
  updatePartOfContact,
  updateContactContr,
} from '../../controllers'
import {
  validationId,
  updateValidation,
  addValidation,
  validateQuery,
  updateValidationFavor,
} from '../../midllewares/validation/contactValidation'
import { Router } from 'express'
import quard from '../../midllewares/validation/guard'

const router = new Router()

router.get('/', [quard, validateQuery], allContactsContr)
router.get('/:id', [quard, validationId], contactByIdContr)
router.post('/', [quard, addValidation], addNewContactContr)
router.delete('/:id', [quard, validationId], deleteContactContr)
router.put('/:id', [quard, validationId, updateValidation], updateContactContr)
router.patch(
  '/:id/favorite',
  [quard, validationId, updateValidationFavor],
  updatePartOfContact,
)
export default router
